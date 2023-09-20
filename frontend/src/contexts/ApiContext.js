import { createContext, useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { problems } from "../Routes/problems";
import { getCacheData, shouldFetchData } from "./apiLeetcode";

export const ApiContext = createContext();

export const ApiContextProvider = ({ children }) => {
  // const { id } = useParams();
  // //check if id is integer
  // if (isNaN(id)) {
  //   id = 0;
  // }

  // const isRepoSafe = false;
  // const overAllScore = 0;
  //   const [overAllScore, setOverAllScore] = useState(0);
  //   const [isRepoSafe, setIsRepoSafe] = useState(false);
  //   const [repoScore, setRepoScore] = useState(0);
  //   const [repoName, setRepoName] = useState("");

  const [cookies, setCookie, removeCookie] = useCookies(["leetcodeSession"]);
  const [day, setDay] = useState(0);
  const [dayProgression, setDayProgression] = useState(0);
  const [leetcodeSession, setLeetcodeSession] = useState(
    cookies.leetcodeSession
  );
  const [codingninjasToken, setCodingninjasToken] = useState(
    cookies.codingninjasToken
  );
  const [completed, setCompleted] = useState({});
  let completedQuestions = {};
  async function splitQuestionTitle(urlLeetcode, urlCodingninjas, index) {
    if (!urlLeetcode && !urlCodingninjas) return; // Both URLs are empty, no need to fetch
    let codingninjasQid = null;
    let leetcodeTitle = null;

    if (urlCodingninjas) {
      codingninjasQid = urlCodingninjas.split("/problems/")[1].split("?")[0];
    }

    if (urlLeetcode) {
      leetcodeTitle = urlLeetcode.split("/")[4];
    }

    const cnData = codingninjasQid
      ? getCacheData(`codingninjas_${codingninjasQid}`)
      : null;
    const lcData = leetcodeTitle
      ? getCacheData(`leetcode_${leetcodeTitle}`)
      : null;

    if (!shouldFetchData(cnData) || !shouldFetchData(lcData)) {
      completedQuestions[index]++;
    }
  }
  useEffect(() => {
    problems.map((day, index) => {
      completedQuestions[index] = 0;
      day.value.map((problem) => {
        splitQuestionTitle(problem.leetcode, problem.codingninjas, index);
      });
    });

    setCompleted(completedQuestions);
    // console.log(completedQuestions);
  }, []);
  // useEffect(() => {
  //   //goto next day page
  //   window.location.href = "/stats/" + day;
  // }, []);
  return (
    <ApiContext.Provider
      value={{
        leetcodeSession,
        setLeetcodeSession,
        day,
        setDay,
        dayProgression,
        setDayProgression,
        codingninjasToken,
        setCodingninjasToken,
        completed,
        setCompleted,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

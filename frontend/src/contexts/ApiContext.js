import { createContext, useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useParams,
} from "react-router-dom";

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
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

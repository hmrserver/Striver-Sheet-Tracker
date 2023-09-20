import React from "react";
import {
  questionStatsLeetcode,
  questionStatsCodingninjas,
  getCacheData,
  shouldFetchData,
} from "../contexts/apiLeetcode";
import { ApiContext } from "../contexts/ApiContext";
import { useContext, useState, useEffect } from "react";

export default function Question({ problem, index, pageid }) {
  const { leetcodeSession, codingninjasToken, completed, setCompleted } =
    useContext(ApiContext);
  const [qstats, setQstats] = useState(problem);
  const [qstatsCn, setQstatsCn] = useState(null);
  // console.log(leetcodeSession);
  async function splitQuestionTitle(urlLeetcode, urlCodingninjas) {
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
      setQstatsCn(cnData);
      setQstats(lcData);
    } else {
      const [codingninjasResponse, leetcodeResponse] = await Promise.all([
        questionStatsCodingninjas(codingninjasToken, codingninjasQid),
        questionStatsLeetcode(leetcodeSession, leetcodeTitle),
      ]);

      if (codingninjasResponse) {
        setQstatsCn(codingninjasResponse);
      }

      if (leetcodeResponse) {
        setQstats(leetcodeResponse);
      }

      if (
        !shouldFetchData(leetcodeResponse) ||
        !shouldFetchData(codingninjasResponse)
      ) {
        let completedQuestions = completed;
        completedQuestions[pageid]++;
        // console.log(
        //   completedQuestions[pageid],
        //   completedQuestions,
        //   pageid,
        //   completed
        // );
        setCompleted(completedQuestions);
      }
    }
  }
  useEffect(() => {
    // console.log("useEffect", problem.codingninjas);
    splitQuestionTitle(problem.leetcode, problem.codingninjas);
  }, [completed]);
  return (
    <tr class="hover">
      <td class="bg-base-200">{index + 1}</td>
      <td class="bg-base-200 table-cell align-middle">
        <span class="float-left flex">
          <a
            // class="link link-primary/50 link-hover"
            class={
              (qstats?.status === "ac" || qstatsCn?.status === "COMPLETED"
                ? "line-through text-green-500"
                : qstats?.status === "notac" || qstatsCn?.status === "ATTEMPTED"
                ? "text-orange-500"
                : "") + " link link-primary/50 link-hover"
            }
            href={problem.takeuforward}
            target="_blank"
          >
            {problem.name}
          </a>
          <span class="ml-2 flex items-center gap-2">
            <span class="text-red-500 inline-block">
              {qstats?.isLiked || qstatsCn?.is_upvoted ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clip-rule="evenodd"
                  />
                </svg>
              ) : (
                ""
              )}
            </span>
            <span class="text-xs text-slate-500">
              Avg. Time
              <span class="badge badge-xs ml-1">
                {qstatsCn?.avg_time_to_solve}min
              </span>
            </span>
          </span>
        </span>
        <span class="align-middle flow-root relative">
          <span class="float-right ml-10 inline-flex">
            {problem.leetcode || problem.other ? (
              <a
                class="btn btn-sm btn-primary"
                target="_blank"
                href={problem.leetcode ? problem.leetcode : problem.other}
              >
                {problem.leetcode ? "LeetCode" : "Other"}
              </a>
            ) : (
              ""
            )}
            {problem.codingninjas ? (
              <a
                class="btn btn-sm ml-2 btn-primary"
                target="_blank"
                href={problem.codingninjas}
              >
                CN
              </a>
            ) : (
              ""
            )}
            {problem.youtube ? (
              <a
                class="btn btn-sm btn-error ml-2"
                target="_blank"
                href={problem.youtube}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            ) : (
              ""
            )}
            {problem.youtube2 ? (
              <a
                class="btn btn-sm btn-error ml-2"
                target="_blank"
                href={problem.youtube2}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            ) : (
              ""
            )}
          </span>

          <span
            class={
              qstats?.difficulty === "Easy"
                ? "badge badge-success ml-1 float-right"
                : qstats?.difficulty === "Medium"
                ? "badge badge-warning ml-1 float-right"
                : qstats?.difficulty === "Hard"
                ? "badge badge-error ml-1 float-right"
                : qstatsCn?.difficulty === "Easy"
                ? "badge badge-success ml-1 float-right"
                : qstatsCn?.difficulty === "Moderate"
                ? "badge badge-warning ml-1 float-right"
                : qstatsCn?.difficulty === "Hard"
                ? "badge badge-error ml-1 float-right"
                : ""
            }
          >
            {qstats?.difficulty ? qstats.difficulty : qstatsCn?.difficulty}
          </span>
          <span>
            {qstats?.topicTags &&
              qstats?.topicTags.map((tag, index) => (
                <span class="badge ml-1 float-right">{tag.name}</span>
              ))}
          </span>
          {/* {qstats.status === "ac" ? (
          <span class="text-green-500">
            <svg
              class="w-6 h-6 dark:text-green  float-right"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </span>
        ) : (
          ""
        )} */}

          <span class="float-right relative inline-block">
            {qstatsCn?.company?.length > 0 ? (
              qstatsCn?.company?.length > 5 ? (
                <span>
                  {" "}
                  {qstatsCn?.company?.slice(0, 5).map((company, index) => (
                    <span
                      class="tooltip tooltip-primary"
                      data-tip={company.name}
                    >
                      <img
                        class="h-5 rounded-md ml-1 transition duration-200 hover:scale-125 cursor-pointer"
                        src={company.logo_url}
                      />
                    </span>
                  ))}
                  <div className="dropdown dropdown-end ml-2 -top-1">
                    <label
                      tabIndex={0}
                      className="btn btn-circle btn-ghost btn-xs text-info"
                    >
                      + {qstatsCn.company.length - 5}
                    </label>
                    <div
                      tabIndex={0}
                      className="card compact dropdown-content shadow bg-base-100 rounded-box w-64  overflow-visible"
                    >
                      <div className="card-body overflow-visible">
                        <div className="flex flex-wrap overflow-visible">
                          {qstatsCn.company.slice(5).map((company, index) => (
                            <div className="flex flex-col items-center m-1">
                              <span
                                class="tooltip tooltip-primary"
                                data-tip={company.name}
                              >
                                <img
                                  class="h-5 rounded-md ml-1 transition duration-200 hover:scale-125 cursor-pointer"
                                  src={company.logo_url}
                                />
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </span>
              ) : (
                qstatsCn.company.map((company, index) => (
                  <span class="tooltip tooltip-primary" data-tip={company.name}>
                    <img
                      class="h-5 rounded-md ml-1 transition duration-200 hover:scale-125 cursor-pointer"
                      src={company.logo_url}
                    />
                  </span>
                ))
              )
            ) : (
              ""
            )}
          </span>
        </span>
      </td>
    </tr>
  );
}

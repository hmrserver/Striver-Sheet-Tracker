import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { problems } from "../Routes/problems";
import { ApiContext } from "../contexts/ApiContext";

export default function Header() {
  let location = useLocation();
  const { leetcodeSession } = useContext(ApiContext);
  //get json data from JWT token

  let jwtData = {};
  if (leetcodeSession) {
    const jwt = leetcodeSession.split(".")[1];
    jwtData = JSON.parse(atob(jwt));
  }

  // const { id } = useParams();
  // console.log(id);
  const id = location.pathname.split("/")[2];
  const showDayInfo = isNaN(id) ? false : true;
  // if (showDayInfo) {
  //   console.log(id);
  // } else {
  //   console.log("no id");
  // }
  // if(location.pathname === "/stats/:id"){

  // }
  // console.log(location.pathname);
  if (location.pathname === "/login") {
    return;
  } else {
    return (
      <header class="text-white bg-gray-900">
        <div class="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
          <div class="sm:justify-between sm:items-center sm:flex">
            <div class="text-center sm:text-left flex">
              {/* {showDayInfo ? (
                <div
                  class="radial-progress text-primary text-green-500 mr-4"
                  style={{ "--value": { dayProgression } }}
                >
                  {dayProgression}%
                </div>
              ) : (
                ""
              )} */}
              <span>
                <h1 class="text-2xl font-bold text-gray-50 sm:text-3xl">
                  {showDayInfo
                    ? problems[id].day.split(":")[0]
                    : "Welcome Back!"}
                </h1>

                <p class="mt-1.5 text-sm text-gray-500">
                  {showDayInfo
                    ? problems[id].day.split(":")[1]
                    : "Let's Finish This! 🎉"}
                </p>
              </span>
            </div>

            <div class="flex justify-between flex-col">
              {jwtData?.avatar ? (
                <div class="flex gap-4 mb-4 flex-row items-center sm:justify-end justify-center">
                  <label class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                      <img
                        src={
                          typeof jwtData !== "undefined" ? jwtData?.avatar : ""
                        }
                      />
                    </div>
                  </label>
                  <h5 class="text-gray-300">
                    {typeof jwtData !== "undefined" ? jwtData?.username : ""}
                  </h5>
                </div>
              ) : (
                ""
              )}
              <div class="flex flex-col gap-4 mt-4 sm:flex-row sm:mt-0 sm:items-center">
                <button
                  class="block px-5 py-3 text-sm font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring"
                  type="button"
                  onClick={() => {
                    window.location.href =
                      "/stats/" + Math.max(parseInt(id) - 1, 0);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                </button>
                <button
                  class="inline-flex items-center justify-center px-5 py-3 text-gray-500 transition bg-white border border-gray-200 rounded-lg hover:text-gray-700 focus:outline-none focus:ring"
                  type="button"
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  <span class="text-sm font-medium">Dashboard </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 ml-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </button>

                <button
                  class="inline-flex items-center justify-center px-5 py-3 text-gray-500 transition bg-white border border-gray-200 rounded-lg hover:text-gray-700 focus:outline-none focus:ring"
                  type="button"
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                >
                  <span class="text-sm font-medium">Home </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 ml-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </button>

                <button
                  class="block px-5 py-3 text-sm font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring"
                  type="button"
                  onClick={() => {
                    window.location.href =
                      "/stats/" + Math.min(parseInt(id) + 1, 26);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

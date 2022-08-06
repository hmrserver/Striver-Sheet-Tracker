//react boilerplate
import React, { useEffect, useState } from "react";

import { ApiContext } from "./contexts/ApiContext";
import { useContext } from "react";
import { useCookies } from "react-cookie";

export default function Hero() {
  //on click Lets go button, switch to stats page

  const {
    setLeetcodeSession,
    leetcodeSession,
    codingninjasToken,
    setCodingninjasToken,
  } = useContext(ApiContext);
  const [cookies, setCookie, removeCookie] = useCookies([
    "leetcodeSession",
    "codingninjasToken",
  ]);
  const [inputValue, setInputValue] = useState();
  const [inputValue2, setInputValue2] = useState();

  function handleSubmit() {
    if (inputValue) {
      setLeetcodeSession(inputValue);
      setCookie("leetcodeSession", inputValue);
    }
    if (inputValue2) {
      setCodingninjasToken(inputValue2);
      setCookie("codingninjasToken", inputValue2);
    }
    window.location.href = "/";
  }

  return (
    <div class="hero min-h-screen">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">Tracker</h1>
          <p class="py-6">Striver SDE Tracker</p>
          <input
            type="text"
            placeholder="Enter Your LeetCode Session"
            class="input input-bordered w-full max-w-xs mb-3"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Your Codninjas Token"
            class="input input-bordered w-full max-w-xs mb-3"
            onChange={(e2) => setInputValue2(e2.target.value)}
          />
          <button
            class="btn btn-primary w-full max-w-xs"
            onClick={handleSubmit}
          >
            Lets Go
          </button>
        </div>
      </div>
    </div>
  );
}

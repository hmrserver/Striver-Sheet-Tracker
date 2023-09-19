import React from "react";
import { problems } from "../Routes/problems";
import { useParams } from "react-router-dom";
// import { questionStats } from "../contexts/apiLeetcode";
import { ApiContext } from "../contexts/ApiContext";
import { useContext, useState, useEffect } from "react";
import Question from "./Question";

export default function Day() {
  const { id } = useParams();
  // const { setDay } = useContext(ApiContext);
  // setDay(id);
  return (
    <div class="overflow-x-auto">
      <div class="align-center"></div>
      <table class="table w-full">
        <thead>
          <tr>
            <th class="bg-cyan-500 "></th>
            <th class="bg-cyan-500 ">Name</th>
            {/* <th class="bg-cyan-500 ">LeetCode / Other</th>
            <th class="bg-cyan-500 ">Coding Ninja</th>
            <th class="bg-cyan-500 ">Youtube Soln</th> */}
          </tr>
        </thead>
        <tbody>
          {problems[id].value.map((problem, index) => (
            <Question problem={problem} index={index} pageid={id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React from "react";
import { problems } from "./problems";
import DayCard from "../components/DayCard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
export default function Stats() {
  //   console.log(problems);
  return (
    <section class="">
      <div class="">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <div
              class="flex p-4 bg-slate-800 border border-slate-700 rounded-xl transition duration-200 hover:scale-110 cursor-pointer hover:bg-slate-900"
              onClick={() => {
                window.location.href = `/stats/${index}`;
              }}
            >
              <DayCard day={problem.day} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

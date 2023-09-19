import { problems } from "./problems";
import DayCard from "../components/DayCard";
import { useContext } from "react";
import { ApiContext } from "../contexts/ApiContext";
export default function Stats() {
  const { completed } = useContext(ApiContext);

  //   console.log(problems);
  return (
    <section class="">
      <div class="">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <div
              class="flex p-4 bg-slate-800 border border-slate-700 rounded-xl transition duration-200 hover:scale-110 cursor-pointer hover:bg-slate-900 relative overflow-hidden"
              onClick={() => {
                window.location.href = `/stats/${index}`;
              }}
            >
              <DayCard day={problem.day} />

              <div
                class="absolute h-full top-0 left-0 bg-teal-900/70"
                style={{
                  width: `${(completed[index] / problem.value.length) * 100}%`,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

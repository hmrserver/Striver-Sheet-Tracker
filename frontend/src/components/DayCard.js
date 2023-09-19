import React from "react";

export default function DayCard({ day }) {
  //split day keeping : as a separator
  const daySplit = day.split(":");
  const dayNumber = daySplit[0];
  const topic = daySplit[1];
  return (
    <article class="z-10">
      <div class="flex items-center">
        {/* <img
          src="https://unavatar.now.sh/twitter/itsmarkmead"
          alt="Mark Mead"
          class="w-16 h-16 rounded-full"
        /> */}
        {/* <div
            class="radial-progress text-primary"
            style={{ "--value": 70, "--size": "4rem", "--thickness": "2px" }}
          >
            70%
          </div> */}

        <div class="ml-4">
          <h5 class="text-lg font-medium text-white">{dayNumber}</h5>
          <div class="flow-root">
            <ul class="flex flex-wrap -m-1">
              <li class="p-1 leading-none">
                <span class="text-xs font-medium text-gray-300">{topic}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

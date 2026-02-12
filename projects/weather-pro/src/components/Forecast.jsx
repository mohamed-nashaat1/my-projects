import React from "react";
import { iconUrlFromCode } from "../services/weatherService";

function Forecast({ title, items }) {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2 border-white/30" />

      <div className="flex flex-row items-center justify-between text-white overflow-x-auto pb-2">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-center min-w-[80px] glass-card p-2 mx-1 hover:bg-white/30 transition">
            <p className="font-light text-sm">{title === "Hourly Forecast" ? item.title : item.day}</p>
            <img src={iconUrlFromCode(item.icon)} className="w-12 my-1" alt="" />
            <p className="font-medium">{item.temp.toFixed()}°</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;

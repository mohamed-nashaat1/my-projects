import React from "react";
import { Droplets, Wind, Sun, Sunset } from "lucide-react";
import { iconUrlFromCode } from "../services/weatherService";

function TemperatureAndDetails({ weather, units }) {
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>{weather.details}</p>
      </div>

      <div className="flex flex-row items-center justify-between text-white py-3 px-4 glass-card">
        <img src={iconUrlFromCode(weather.icon)} alt="" className="w-20" />
        <p className="text-5xl">{weather.temp.toFixed()}°</p>
        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-center">
            <Droplets size={18} className="mr-1" />
            Humidity: <span className="font-medium ml-1">{weather.humidity}%</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <Wind size={18} className="mr-1" />
            Wind: <span className="font-medium ml-1">{weather.speed.toFixed()} {units === 'metric' ? 'km/h' : 'mph'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemperatureAndDetails;

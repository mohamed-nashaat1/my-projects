import React, { useState } from "react";
import { Search, MapPin } from "lucide-react";

function SearchBar({ setQuery, setUnits }) {
  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery({ lat, lon });
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center my-6 gap-4">
      <div className="flex flex-row w-full md:w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
          type="text"
          placeholder="Search for city..."
          className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase bg-white/50 dark:bg-black/30 rounded-lg text-gray-800 dark:text-gray-100 placeholder-gray-500"
        />
        <Search size={25} className="text-white cursor-pointer transition hover:scale-125" onClick={handleSearchClick} />
        <MapPin size={25} className="text-white cursor-pointer transition hover:scale-125" onClick={handleLocationClick} />
      </div>

      <div className="flex flex-row w-1/4 items-center justify-center">
        <button name="metric" className="text-xl text-white font-light hover:scale-125 transition" onClick={() => setUnits("metric")}>°C</button>
        <p className="text-xl text-white mx-1">|</p>
        <button name="imperial" className="text-xl text-white font-light hover:scale-125 transition" onClick={() => setUnits("imperial")}>°F</button>
      </div>
    </div>
  );
}

export default SearchBar;

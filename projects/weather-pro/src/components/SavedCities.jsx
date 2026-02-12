import React, { useState, useEffect } from 'react';
import { Plus, Trash2, MapPin } from 'lucide-react';

function SavedCities({ setQuery }) {
  const [cities, setCities] = useState([]);
  const [newCity, setNewCity] = useState("");

  // أول ما نفتح، نجيب المدن من الذاكرة
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCities')) || ["Cairo", "London", "Dubai"];
    setCities(saved);
  }, []);

  const addCity = () => {
    if (!newCity) return;
    const updated = [...cities, newCity];
    setCities(updated);
    localStorage.setItem('savedCities', JSON.stringify(updated));
    setNewCity("");
  };

  const removeCity = (cityToRemove) => {
    const updated = cities.filter(c => c !== cityToRemove);
    setCities(updated);
    localStorage.setItem('savedCities', JSON.stringify(updated));
  };

  return (
    <div className="glass-card p-4 h-fit md:h-full min-h-[300px] flex flex-col">
      <h3 className="text-white font-medium text-lg mb-4 flex items-center gap-2">
        <MapPin size={20} /> المدن المفضلة
      </h3>
      
      <div className="flex gap-2 mb-4">
        <input 
          type="text" 
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          placeholder="إضافة مدينة.."
          className="w-full bg-white/20 text-white placeholder-gray-300 rounded-lg px-2 py-1 focus:outline-none"
        />
        <button onClick={addCity} className="bg-white/30 hover:bg-white/50 text-white p-2 rounded-lg transition">
          <Plus size={20} />
        </button>
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto">
        {cities.map((city, index) => (
          <div key={index} className="flex justify-between items-center bg-black/20 p-3 rounded-lg hover:bg-black/40 transition cursor-pointer group">
            <span onClick={() => setQuery({ q: city })} className="text-white flex-grow font-light">
              {city}
            </span>
            <button onClick={() => removeCity(city)} className="text-red-300 opacity-0 group-hover:opacity-100 transition">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedCities;

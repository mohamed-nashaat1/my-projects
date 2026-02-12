import React from 'react';

function Skeleton() {
  return (
    <div className="animate-pulse flex flex-col space-y-8 mt-8">
      
      {/* City Name & Time Placeholder */}
      <div className="flex flex-col items-center space-y-3">
        <div className="h-8 bg-white/20 rounded w-1/3"></div>
        <div className="h-4 bg-white/10 rounded w-1/4"></div>
      </div>

      {/* Temperature Card Placeholder */}
      <div className="h-48 bg-white/10 rounded-2xl w-full border border-white/10"></div>

      {/* Highlights Grid Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-32 bg-white/10 rounded-xl border border-white/5"></div>
        ))}
      </div>
      
      {/* Map Placeholder */}
      <div className="h-[300px] bg-white/10 rounded-xl w-full"></div>

      {/* Chart Placeholder */}
      <div className="h-64 bg-white/10 rounded-xl w-full"></div>

      {/* Forecast Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-40 bg-white/10 rounded-xl"></div>
        <div className="h-40 bg-white/10 rounded-xl"></div>
      </div>
    </div>
  );
}

export default Skeleton;

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function HourlyChart({ data }) {
  const chartData = data.map(d => ({
    time: d.title,
    temp: d.temp
  }));

  return (
    <div className="mt-8 glass-card p-4">
       <p className="text-white font-medium uppercase mb-4">Temperature Trend</p>
       <div className="h-[200px] w-full">
         <ResponsiveContainer width="100%" height="100%">
           <AreaChart data={chartData}>
             <defs>
               <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                 <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                 <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
               </linearGradient>
             </defs>
             <XAxis dataKey="time" stroke="#fff" tick={{fontSize: 12}} />
             <YAxis hide domain={['dataMin - 2', 'dataMax + 2']} />
             <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: '10px', border: 'none', color: '#fff' }}
             />
             <Area type="monotone" dataKey="temp" stroke="#8884d8" fillOpacity={1} fill="url(#colorTemp)" />
           </AreaChart>
         </ResponsiveContainer>
       </div>
    </div>
  );
}

export default HourlyChart;

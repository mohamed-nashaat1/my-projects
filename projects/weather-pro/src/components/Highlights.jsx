import React from 'react';
import { Wind, Droplets, Eye, Sun, Gauge, Thermometer } from 'lucide-react';

function Highlights({ weather }) {
  // بيانات وهمية لو الـ API مجابش كل حاجة (عشان النسخة المجانية محدودة شوية)
  const stats = [
    { title: "الرطوبة", value: `${weather.humidity}%`, icon: Droplets, desc: "الندى: 12%" },
    { title: "سرعة الرياح", value: `${weather.speed} km/h`, icon: Wind, desc: "اتجاه: شمال غرب" },
    { title: "الرؤية", value: "10 km", icon: Eye, desc: "رؤية واضحة تماماً" },
    { title: "الشروق", value: new Date(weather.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), icon: Sun, desc: `الغروب: ${new Date(weather.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}` },
    { title: "الضغط الجوي", value: "1015 hPa", icon: Gauge, desc: "مستقر" },
    { title: "محسوسة كأنها", value: `${weather.feels_like.toFixed()}°`, icon: Thermometer, desc: "أجواء لطيفة" },
  ];

  return (
    <div className="mt-6">
      <h2 className="text-white font-medium text-lg mb-4">تفاصيل اليوم</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="glass-card p-4 flex flex-col justify-between h-32 hover:bg-white/10 transition duration-300">
            <div className="flex justify-between items-start">
              <span className="text-gray-200 text-sm">{stat.title}</span>
              <stat.icon size={20} className="text-white" />
            </div>
            <div>
              <p className="text-3xl font-bold text-white my-1">{stat.value}</p>
              <p className="text-xs text-gray-300">{stat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Highlights;

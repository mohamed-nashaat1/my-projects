import { useEffect, useState } from "react";
import { getFormattedWeatherData } from "./services/weatherService";
import SearchBar from "./components/SearchBar";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import HourlyChart from "./components/HourlyChart";
import Highlights from "./components/Highlights";
import SavedCities from "./components/SavedCities";
import Map from "./components/Map";
import Skeleton from "./components/Skeleton"; // استدعاء شاشة التحميل
import { DateTime } from "luxon";

// مكتبة الإشعارات
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [query, setQuery] = useState({ q: "Cairo" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false); // حالة التحميل
  const [darkMode, setDarkMode] = useState(false);

  // تفعيل الوضع الليلي
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // تغيير الخلفية حسب الجو
  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 25 : 77;
    if (weather.details.includes("Rain")) return "from-gray-700 to-gray-900";
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";
    return "from-yellow-700 to-orange-700";
  };

  // دالة جلب البيانات
  const fetchWeather = async () => {
    setLoading(true); // تشغيل التحميل
    const message = query.q ? query.q : "current location.";

    try {
      const data = await getFormattedWeatherData({ ...query, units });
      
      // إشعار نجاح
      toast.success(`Fetched weather for ${data.name}, ${data.country}.`);

      const hourly = data.hourly.map(d => ({
           title: DateTime.fromSeconds(d.dt).setZone(data.timezone).toFormat("hh:mm a"),
           temp: d.main.temp,
           icon: d.weather[0].icon
      }));
      
      const daily = data.daily.map(d => ({
           day: DateTime.fromSeconds(d.dt).setZone(data.timezone).toFormat("ccc"),
           temp: d.main.temp,
           icon: d.weather[0].icon
      }));

      setWeather({ ...data, hourly, daily });
      localStorage.setItem("lastCity", JSON.stringify(query));
      
    } catch (err) {
      // إشعار خطأ
      toast.error("City not found! Please check spelling.");
      setWeather(null);
    } finally {
      setLoading(false); // إيقاف التحميل في كل الحالات
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [query, units]);

  // استرجاع آخر مدينة عند الفتح
  useEffect(() => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) setQuery(JSON.parse(lastCity));
  }, []);

  return (
    <div className={`mx-auto max-w-screen-xl mt-4 py-5 px-4 md:px-8 bg-gradient-to-br ${formatBackground()} min-h-screen shadow-xl shadow-gray-400 dark:shadow-black rounded-lg transition-all duration-500`}>
      
      {/* الهيدر */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-white text-2xl font-bold hidden md:block">Weather Pro 🌤️</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="text-white text-sm bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition shadow-lg backdrop-blur-sm">
           {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* القائمة الجانبية */}
        <div className="md:col-span-1">
          <SavedCities setQuery={setQuery} />
        </div>

        {/* المحتوى الرئيسي */}
        <div className="md:col-span-3">
          <SearchBar setQuery={setQuery} setUnits={setUnits} />

          {/* منطق العرض: تحميل ؟ هيكل : بيانات */}
          {loading ? (
            <Skeleton />
          ) : weather && (
            <>
              <div className="flex items-center justify-between my-6 px-4">
                <div>
                  <div className="text-white text-3xl font-medium">
                    {weather.name}, {weather.country}
                  </div>
                  <div className="text-white text-sm font-light mt-1 opacity-80">
                    {DateTime.fromSeconds(weather.dt).setZone(weather.timezone).toFormat("cccc, dd LLL yyyy | hh:mm a")}
                  </div>
                </div>
              </div>

              <TemperatureAndDetails weather={weather} units={units} />
              
              <Highlights weather={weather} />
              
              <Map lat={weather.lat} lon={weather.lon} />
              
              <HourlyChart data={weather.hourly} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Forecast title="Hourly Forecast" items={weather.hourly} />
                <Forecast title="Daily Forecast" items={weather.daily} />
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* حاوية الإشعارات */}
      <ToastContainer autoClose={3000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;

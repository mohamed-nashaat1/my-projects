import axios from 'axios';
import { DateTime } from 'luxon';

 
const API_KEY = "14e6ddf44998e1f2fe8884ea82e2fe02"; 
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  
  url.search = new URLSearchParams({ ...searchParams, lang: 'ar', appid: API_KEY });
  
  return axios.get(url.toString()).then((res) => res.data);
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { description: details, icon } = weather[0]; // غيرنا main لـ description عشان الوصف يبقى أدق (غائم جزئياً، إلخ)

  return { lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed };
};

const formatForecastWeather = (data) => {
  let { list, city } = data;
  const daily = list.filter((reading) => reading.dt_txt.includes("12:00:00")).slice(0, 5);
  const hourly = list.slice(0, 8);
  
  return { timezone: city.timezone, daily, hourly };
};

export const getFormattedWeatherData = async (searchParams) => {
  const current = await getWeatherData("weather", searchParams).then(formatCurrentWeather);
  const { timezone, daily, hourly } = await getWeatherData("forecast", searchParams).then(formatForecastWeather);

  return { ...current, timezone, daily, hourly };
};

export const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

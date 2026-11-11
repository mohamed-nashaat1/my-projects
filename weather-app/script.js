"use strict";

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";
const KEYS = { unit: "skycast.unit", recent: "skycast.recent" };


const CODES = {
  0: ["Clear sky", "☀️"], 1: ["Mostly clear", "🌤️"], 2: ["Partly cloudy", "⛅"], 3: ["Overcast", "☁️"],
  45: ["Fog", "🌫️"], 48: ["Rime fog", "🌫️"],
  51: ["Light drizzle", "🌦️"], 53: ["Drizzle", "🌦️"], 55: ["Heavy drizzle", "🌧️"],
  61: ["Light rain", "🌧️"], 63: ["Rain", "🌧️"], 65: ["Heavy rain", "🌧️"],
  71: ["Light snow", "🌨️"], 73: ["Snow", "🌨️"], 75: ["Heavy snow", "❄️"],
  80: ["Rain showers", "🌦️"], 81: ["Rain showers", "🌧️"], 82: ["Violent showers", "⛈️"],
  95: ["Thunderstorm", "⛈️"], 96: ["Thunderstorm, hail", "⛈️"], 99: ["Thunderstorm, hail", "⛈️"],
};
const describe = (code) => CODES[code] || ["Unknown", "🌡️"];

const $ = (id) => document.getElementById(id);
const els = {
  form: $("searchForm"), city: $("city"), suggestions: $("suggestions"), locate: $("locateBtn"),
  unit: $("unitBtn"), recent: $("recent"), status: $("status"), weather: $("weather"),
  place: $("place"), condition: $("condition"), temp: $("temp"), icon: $("icon"),
  feels: $("feels"), humidity: $("humidity"), wind: $("wind"), forecast: $("forecast"),
};

const state = {
  unit: localStorage.getItem(KEYS.unit) || "celsius",
  lastPlace: null,   
  data: null,      
};
let weatherController = null;


const debounce = (fn, ms) => {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
};

async function getJSON(url, signal) {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

function setStatus(msg, isError = false) {
  els.status.textContent = msg;
  els.status.classList.toggle("error", isError);
}

const deg = (v) => `${Math.round(v)}°${state.unit === "celsius" ? "C" : "F"}`;


async function searchCities(query) {
  const url = `${GEO_URL}?name=${encodeURIComponent(query)}&count=5&language=en`;
  const data = await getJSON(url);
  return data.results || [];
}

async function fetchWeather(place) {
  weatherController?.abort();
  weatherController = new AbortController();

  const params = new URLSearchParams({
    latitude: place.latitude,
    longitude: place.longitude,
    current: "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    forecast_days: 6,
    timezone: "auto",
    temperature_unit: state.unit,
    wind_speed_unit: "kmh",
  });

  setStatus("Loading weather…");
  try {
    state.data = await getJSON(`${WEATHER_URL}?${params}`, weatherController.signal);
    state.lastPlace = place;
    render();
    saveRecent(place);
    setStatus("");
  } catch (err) {
    if (err.name === "AbortError") return;
    els.weather.hidden = true;
    setStatus(navigator.onLine ? "Couldn't load the weather. Try again." : "You're offline. Check your connection.", true);
  }
}

function render() {
  const { current, daily } = state.data;
  const [label, icon] = describe(current.weather_code);

  els.place.textContent = `${state.lastPlace.name}${state.lastPlace.country ? ", " + state.lastPlace.country : ""}`;
  els.condition.textContent = label;
  els.temp.textContent = deg(current.temperature_2m);
  els.icon.textContent = icon;
  els.feels.textContent = deg(current.apparent_temperature);
  els.humidity.textContent = `${current.relative_humidity_2m}%`;
  els.wind.textContent = `${Math.round(current.wind_speed_10m)} km/h`;


  const days = daily.time.slice(1).map((date, i) => {
    const idx = i + 1;
    const [text, ic] = describe(daily.weather_code[idx]);
    const day = new Date(date + "T00:00").toLocaleDateString("en", { weekday: "short", day: "numeric" });
    const li = document.createElement("li");
    li.innerHTML = `<span>${day}</span><span title="${text}">${ic}</span><span class="muted">${text}</span>
      <span><strong>${deg(daily.temperature_2m_max[idx])}</strong> <span class="lo">${deg(daily.temperature_2m_min[idx])}</span></span>`;
    return li;
  });
  els.forecast.replaceChildren(...days);
  els.weather.hidden = false;
  els.unit.textContent = state.unit === "celsius" ? "°C" : "°F";
}

function renderSuggestions(results) {
  els.suggestions.replaceChildren(
    ...results.map((r) => {
      const li = document.createElement("li");
      li.innerHTML = `${r.name} <small>${[r.admin1, r.country].filter(Boolean).join(", ")}</small>`;
      li.addEventListener("click", () => pickPlace(r));
      return li;
    })
  );
  els.suggestions.hidden = results.length === 0;
}

function pickPlace(r) {
  els.suggestions.hidden = true;
  els.city.value = r.name;
  fetchWeather({ name: r.name, country: r.country, latitude: r.latitude, longitude: r.longitude });
}


const loadRecent = () => {
  try { return JSON.parse(localStorage.getItem(KEYS.recent)) || []; } catch { return []; }
};
function saveRecent(place) {
  const list = [place, ...loadRecent().filter((p) => p.name !== place.name)].slice(0, 5);
  localStorage.setItem(KEYS.recent, JSON.stringify(list));
  renderRecent();
}
function renderRecent() {
  els.recent.replaceChildren(
    ...loadRecent().map((p) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = p.name;
      b.addEventListener("click", () => fetchWeather(p));
      return b;
    })
  );
}


const onType = debounce(async () => {
  const q = els.city.value.trim();
  if (q.length < 2) return renderSuggestions([]);
  try { renderSuggestions(await searchCities(q)); } catch { renderSuggestions([]); }
}, 300);
els.city.addEventListener("input", onType);

els.form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const q = els.city.value.trim();
  if (!q) return;
  setStatus("Searching…");
  try {
    const results = await searchCities(q);
    if (!results.length) return setStatus(`No city found for "${q}".`, true);
    pickPlace(results[0]);
  } catch {
    setStatus("Search failed. Try again.", true);
  }
});

els.locate.addEventListener("click", () => {
  if (!navigator.geolocation) return setStatus("Geolocation isn't supported in this browser.", true);
  setStatus("Getting your location…");
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => fetchWeather({ name: "Your location", country: "", latitude: coords.latitude, longitude: coords.longitude }),
    () => setStatus("Location access was denied. Search for a city instead.", true)
  );
});

els.unit.addEventListener("click", () => {
  state.unit = state.unit === "celsius" ? "fahrenheit" : "celsius";
  localStorage.setItem(KEYS.unit, state.unit);
  if (state.lastPlace) fetchWeather(state.lastPlace); else els.unit.textContent = state.unit === "celsius" ? "°C" : "°F";
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".field")) els.suggestions.hidden = true;
});


els.unit.textContent = state.unit === "celsius" ? "°C" : "°F";
renderRecent();
const last = loadRecent()[0];
if (last) fetchWeather(last);
else setStatus("Search for a city to see the weather.");

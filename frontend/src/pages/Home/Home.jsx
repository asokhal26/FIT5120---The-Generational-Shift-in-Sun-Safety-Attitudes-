import { useState, useEffect } from "react";
import "./Home.css";

// Mock UV level config — later replace with constants/uvLevels.js
const UV_LEVELS = {
  low:      { label: "Low",       range: [0, 2],  color: "#4ade80", cardBg: "rgba(74,222,128,0.25)",   borderColor: "rgba(74,222,128,0.4)",   advice: "Minimal protection needed. Enjoy the outdoors!" },
  moderate: { label: "Moderate",  range: [3, 5],  color: "#facc15", cardBg: "rgba(250,204,21,0.25)",   borderColor: "rgba(250,204,21,0.4)",   advice: "Wear sunscreen SPF 30+ and a hat." },
  high:     { label: "High",      range: [6, 7],  color: "#fb923c", cardBg: "rgba(251,146,60,0.28)",   borderColor: "rgba(251,146,60,0.45)",  advice: "Protection essential. Seek shade during midday." },
  veryHigh: { label: "Very High", range: [8, 10], color: "#f87171", cardBg: "rgba(248,113,113,0.28)",  borderColor: "rgba(248,113,113,0.45)", advice: "Extra protection required. Minimise sun exposure." },
  extreme:  { label: "Extreme",   range: [11, 20],color: "#c084fc", cardBg: "rgba(192,132,252,0.28)",  borderColor: "rgba(192,132,252,0.45)", advice: "Stay indoors if possible. Full protection mandatory." },
};

// Weather condition → background gradient (like Apple Weather)
const WEATHER_BACKGROUNDS = {
  sunny:        { gradient: "linear-gradient(160deg, #1a6fa8 0%, #2196c4 40%, #56b4e0 100%)", particles: "☀️" },
  mostlySunny:  { gradient: "linear-gradient(160deg, #1a5f8a 0%, #2980b5 50%, #6aaecc 100%)", particles: "🌤" },
  partlyCloudy: { gradient: "linear-gradient(160deg, #2c4a6e 0%, #3d6b8a 50%, #7a9db5 100%)", particles: "⛅" },
  cloudy:       { gradient: "linear-gradient(160deg, #2a3a4a 0%, #3d5068 50%, #5c7080 100%)", particles: "☁️" },
  overcast:     { gradient: "linear-gradient(160deg, #1e2a35 0%, #2d3e4e 50%, #4a5e6a 100%)", particles: "🌥" },
  rainy:        { gradient: "linear-gradient(160deg, #1a2535 0%, #243650 50%, #3a5068 100%)", particles: "🌧" },
  stormy:       { gradient: "linear-gradient(160deg, #0f1820 0%, #1a2535 50%, #2a3a48 100%)", particles: "⛈" },
  night:        { gradient: "linear-gradient(160deg, #060d1a 0%, #0d1a2e 50%, #1a2540 100%)", particles: "🌙" },
};

function getWeatherBg(condition) {
  const c = condition.toLowerCase();
  if (c.includes("storm") || c.includes("thunder")) return WEATHER_BACKGROUNDS.stormy;
  if (c.includes("rain") || c.includes("shower") || c.includes("drizzle")) return WEATHER_BACKGROUNDS.rainy;
  if (c.includes("overcast")) return WEATHER_BACKGROUNDS.overcast;
  if (c.includes("mostly cloudy") || c.includes("cloudy")) return WEATHER_BACKGROUNDS.cloudy;
  if (c.includes("partly cloudy")) return WEATHER_BACKGROUNDS.partlyCloudy;
  if (c.includes("mostly sunny")) return WEATHER_BACKGROUNDS.mostlySunny;
  if (c.includes("sunny") || c.includes("clear")) return WEATHER_BACKGROUNDS.sunny;
  return WEATHER_BACKGROUNDS.partlyCloudy;
}

function getUVLevel(index) {
  for (const [key, level] of Object.entries(UV_LEVELS)) {
    if (index >= level.range[0] && index <= level.range[1]) return { key, ...level };
  }
  return { key: "extreme", ...UV_LEVELS.extreme };
}

// Mock data — replace with real API call from services/uvService.js later
const MOCK_DATA = {
  location: "Melbourne, VIC",
  uvIndex: 8,
  temperature: 27,
  cloudCover: 15,
  humidity: 42,
  condition: "Mostly Sunny",
  feelsLike: 29,
  lastUpdated: new Date(),
};

export default function Home() {
  const [query, setQuery]       = useState("");
  const [weather, setWeather]   = useState(MOCK_DATA);
  const [loading, setLoading]   = useState(false);
  const [time, setTime]         = useState(new Date());
  const [revealed, setRevealed] = useState(false);

  const uvLevel = getUVLevel(weather.uvIndex);
  const weatherBg = getWeatherBg(weather.condition);

  // Clock
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    // TODO: replace with real API → services/uvService.js
    setTimeout(() => {
      setWeather({ ...MOCK_DATA, location: query, uvIndex: Math.floor(Math.random() * 12) + 1 });
      setLoading(false);
    }, 900);
  }

  return (
    <div className={`home-root ${revealed ? "home-revealed" : ""}`} style={{ "--weather-bg": weatherBg.gradient }}>
      {/* Ambient background layers */}
      <div className="home-bg">
        <div className="bg-weather" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-grid" />
      </div>

      <div className="home-content">

        {/* ── Top bar ── */}
        <header className="home-header">
          <div className="header-brand">
            <span className="brand-icon">☀</span>
            <span className="brand-name">UVGuard</span>
          </div>
          <div className="header-time">
            {time.toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" })}
            <span className="header-date">
              {time.toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short" })}
            </span>
          </div>
        </header>

        {/* ── Search ── */}
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-wrapper">
            <span className="search-icon">⌕</span>
            <input
              className="search-input"
              type="text"
              placeholder="Search suburb or postcode…"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <button className="search-btn" type="submit" disabled={loading}>
              {loading ? <span className="spinner" /> : "Go"}
            </button>
          </div>
        </form>

        {/* ── Main card — background is UV level color ── */}
        <main className="uv-card" style={{ background: uvLevel.cardBg, borderColor: uvLevel.borderColor }}>

          {/* Location */}
          <div className="card-location">
            <span className="location-pin">⌖</span>
            <span>{weather.location}</span>
          </div>

          {/* UV Index — big number */}
          <div className="uv-display">
            <div className="uv-main">
              <span className="uv-number">{weather.uvIndex}</span>
              <div className="uv-meta">
                <span className="uv-label">{uvLevel.label}</span>
                <span className="uv-sublabel">UV Index</span>
              </div>
            </div>
            {/* Scale bar */}
            <div className="uv-scale">
              {[
                { key: "low",      color: "#4ade80", max: 2  },
                { key: "moderate", color: "#facc15", max: 5  },
                { key: "high",     color: "#fb923c", max: 7  },
                { key: "veryHigh", color: "#f87171", max: 10 },
                { key: "extreme",  color: "#c084fc", max: 13 },
              ].map(seg => (
                <div
                  key={seg.key}
                  className={`scale-seg ${uvLevel.key === seg.key ? "scale-seg-active" : ""}`}
                  style={{ background: seg.color }}
                />
              ))}
            </div>
          </div>

          {/* Advice banner — solid color bar */}
          <div className="advice-banner">
            <span className="advice-icon">⚠</span>
            <span>{uvLevel.advice}</span>
          </div>

          {/* Weather stats row */}
          <div className="weather-stats">
            <div className="stat">
              <span className="stat-icon">🌡</span>
              <span className="stat-value">{weather.temperature}°C</span>
              <span className="stat-label">Temp</span>
            </div>
            <div className="stat">
              <span className="stat-icon">🌤</span>
              <span className="stat-value">{weather.cloudCover}%</span>
              <span className="stat-label">Cloud</span>
            </div>
            <div className="stat">
              <span className="stat-icon">💧</span>
              <span className="stat-value">{weather.humidity}%</span>
              <span className="stat-label">Humidity</span>
            </div>
            <div className="stat">
              <span className="stat-icon">🌬</span>
              <span className="stat-value">{weather.feelsLike}°C</span>
              <span className="stat-label">Feels like</span>
            </div>
          </div>

          <p className="card-condition">{weather.condition}</p>
        </main>

        {/* ── Quick nav ── */}
        <nav className="quick-nav">
          <a href="/awareness" className="nav-pill">
            <span>📊</span> Cancer Data
          </a>
          <a href="/prevention" className="nav-pill">
            <span>👕</span> What to Wear
          </a>
          <a href="/uv-tracker" className="nav-pill">
            <span>📍</span> UV Map
          </a>
        </nav>

        <p className="home-footer">
          Updated {weather.lastUpdated.toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" })}
          {" · "}Data: OpenWeatherMap
        </p>
      </div>
    </div>
  );
}
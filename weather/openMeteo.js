export const FALLBACK = {
  name: "Unknown (fallback)",
  latitude: 21.0285,
  longitude: 105.8542,
};

export function buildOpenMeteoUrl({ latitude, longitude }) {
  return (
    "https://api.open-meteo.com/v1/forecast" +
    `?latitude=${latitude}&longitude=${longitude}` +
    "&current=temperature_2m,apparent_temperature,wind_speed_10m,relative_humidity_2m,weather_code" +
    "&hourly=temperature_2m,precipitation_probability,wind_speed_10m" +
    "&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code" +
    "&forecast_days=7" +
    "&timezone=auto"
  );
}

export async function fetchWeather(coords) {
  const url = buildOpenMeteoUrl(coords);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: HTTP ${res.status}`);
  return await res.json();
}

// ---- helpers (format) ----
export function cToF(c) {
  return (c * 9) / 5 + 32;
}
export function chipLabel(unit) {
  return unit === "c" ? "°C" : "°F";
}
export function formatHour(iso) {
  const t = iso.split("T")[1] || "";
  return t.slice(0, 5);
}
export function formatDay(iso) {
  const [, m, d] = iso.split("-");
  return `${d}/${m}`;
}

// ---- weather code text ----
export function weatherCodeText(code) {
  if (code == null) return "—";
  const map = [
    [0, "Clear"],
    [1, "Mainly clear"],
    [2, "Partly cloudy"],
    [3, "Overcast"],
    [45, "Fog"],
    [48, "Rime fog"],
    [51, "Light drizzle"],
    [53, "Drizzle"],
    [55, "Dense drizzle"],
    [61, "Slight rain"],
    [63, "Rain"],
    [65, "Heavy rain"],
    [71, "Slight snow"],
    [73, "Snow"],
    [75, "Heavy snow"],
    [80, "Rain showers"],
    [81, "Rain showers"],
    [82, "Violent showers"],
    [95, "Thunderstorm"],
    [96, "Thunderstorm + hail"],
    [99, "Thunderstorm + hail"],
  ];
  const found = map.find(([k]) => k === code);
  return found ? found[1] : `Code ${code}`;
}

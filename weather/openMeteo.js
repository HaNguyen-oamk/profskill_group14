// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Fallback location when GPS is unavailable (Hanoi, Vietnam)
 */
export const FALLBACK = {
  name: "Hanoi, Vietnam (fallback)",
  latitude: 21.0285,
  longitude: 105.8542,
};

/**
 * API configuration
 */
const API_CONFIG = {
  BASE_URL: "https://api.open-meteo.com/v1/forecast",
  TIMEOUT: 15000, // 15 seconds
  FORECAST_DAYS: 7,
};

/**
 * WMO Weather interpretation codes
 * Source: https://open-meteo.com/en/docs
 */
const WEATHER_CODES = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

// ============================================================================
// API FUNCTIONS
// ============================================================================

/**
 * Validates coordinate values
 * @param {number} latitude - Latitude value
 * @param {number} longitude - Longitude value
 * @throws {Error} If coordinates are invalid
 */
function validateCoordinates(latitude, longitude) {
  if (typeof latitude !== "number" || typeof longitude !== "number") {
    throw new Error("Coordinates must be numbers");
  }
  if (latitude < -90 || latitude > 90) {
    throw new Error(`Invalid latitude: ${latitude} (must be -90 to 90)`);
  }
  if (longitude < -180 || longitude > 180) {
    throw new Error(`Invalid longitude: ${longitude} (must be -180 to 180)`);
  }
}

/**
 * Builds the Open-Meteo API URL with all required parameters
 * @param {{latitude: number, longitude: number}} coords - GPS coordinates
 * @returns {string} Complete API URL
 */
export function buildOpenMeteoUrl({ latitude, longitude }) {
  validateCoordinates(latitude, longitude);

  const params = new URLSearchParams({
    latitude: latitude.toFixed(4),
    longitude: longitude.toFixed(4),
    current: [
      "temperature_2m",
      "apparent_temperature",
      "wind_speed_10m",
      "relative_humidity_2m",
      "weather_code",
    ].join(","),
    hourly: [
      "temperature_2m",
      "precipitation_probability",
      "wind_speed_10m",
    ].join(","),
    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_sum",
      "weather_code",
    ].join(","),
    forecast_days: API_CONFIG.FORECAST_DAYS,
    timezone: "auto",
  });

  return `${API_CONFIG.BASE_URL}?${params.toString()}`;
}

/**
 * Validates the structure of API response
 * @param {any} data - Response data to validate
 * @returns {boolean} True if valid
 */
function validateWeatherResponse(data) {
  if (!data || typeof data !== "object") return false;

  // Check required fields
  const hasCurrentData = data.current && typeof data.current === "object";
  const hasHourlyData =
    data.hourly &&
    Array.isArray(data.hourly.time) &&
    data.hourly.time.length > 0;
  const hasDailyData =
    data.daily && Array.isArray(data.daily.time) && data.daily.time.length > 0;

  return hasCurrentData && hasHourlyData && hasDailyData;
}

/**
 * Fetches weather data from Open-Meteo API
 *
 * @param {{latitude: number, longitude: number}} coords - GPS coordinates
 * @returns {Promise<Object>} Weather data object
 * @throws {Error} If fetch fails or response is invalid
 */
export async function fetchWeather(coords) {
  if (!coords || !coords.latitude || !coords.longitude) {
    throw new Error("Invalid coordinates provided");
  }

  const url = buildOpenMeteoUrl(coords);
  console.log("Fetching weather from:", url);

  try {
    // Fetch with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
    });

    clearTimeout(timeoutId);

    // Handle HTTP errors
    if (!res.ok) {
      const errorText = await res.text().catch(() => "Unknown error");
      throw new Error(
        `API returned HTTP ${res.status}: ${res.statusText}. ${errorText}`,
      );
    }

    // Parse JSON
    const data = await res.json();

    // Validate response structure
    if (!validateWeatherResponse(data)) {
      throw new Error("API returned invalid data structure");
    }

    console.log("Weather data fetched successfully");
    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(`Request timeout after ${API_CONFIG.TIMEOUT}ms`);
    }

    // Re-throw with more context
    throw new Error(`Failed to fetch weather: ${error.message}`);
  }
}

// ============================================================================
// UNIT CONVERSION UTILITIES
// ============================================================================

/**
 * Converts Celsius to Fahrenheit
 * @param {number} celsius - Temperature in Celsius
 * @returns {number} Temperature in Fahrenheit
 */
export function cToF(celsius) {
  if (typeof celsius !== "number" || isNaN(celsius)) {
    console.warn("Invalid celsius value:", celsius);
    return 0;
  }
  return (celsius * 9) / 5 + 32;
}

/**
 * Converts Fahrenheit to Celsius
 * @param {number} fahrenheit - Temperature in Fahrenheit
 * @returns {number} Temperature in Celsius
 */
export function fToC(fahrenheit) {
  if (typeof fahrenheit !== "number" || isNaN(fahrenheit)) {
    console.warn("Invalid fahrenheit value:", fahrenheit);
    return 0;
  }
  return ((fahrenheit - 32) * 5) / 9;
}

/**
 * Returns the appropriate temperature unit label
 * @param {'c'|'f'} unit - Temperature unit
 * @returns {string} Unit label (°C or °F)
 */
export function chipLabel(unit) {
  return unit === "c" ? "°C" : "°F";
}

// ============================================================================
// FORMATTING UTILITIES
// ============================================================================

/**
 * Formats ISO datetime string to HH:MM format
 * @param {string} iso - ISO datetime string (e.g., "2024-01-01T14:30:00")
 * @returns {string} Time in HH:MM format
 */
export function formatHour(iso) {
  if (!iso || typeof iso !== "string") {
    console.warn("Invalid ISO string for formatHour:", iso);
    return "--:--";
  }

  try {
    const parts = iso.split("T");
    if (parts.length < 2) return "--:--";

    const time = parts[1].slice(0, 5);
    return time || "--:--";
  } catch (error) {
    console.error("Error formatting hour:", error);
    return "--:--";
  }
}

/**
 * Formats ISO date string to DD/MM format
 * @param {string} iso - ISO date string (e.g., "2024-01-15")
 * @returns {string} Date in DD/MM format
 */
export function formatDay(iso) {
  if (!iso || typeof iso !== "string") {
    console.warn("Invalid ISO string for formatDay:", iso);
    return "--/--";
  }

  try {
    const parts = iso.split("-");
    if (parts.length < 3) return "--/--";

    const day = parts[2];
    const month = parts[1];
    return `${day}/${month}`;
  } catch (error) {
    console.error("Error formatting day:", error);
    return "--/--";
  }
}

/**
 * Converts WMO weather code to human-readable text
 * @param {number} code - WMO weather code
 * @returns {string} Weather description
 */
export function weatherCodeText(code) {
  if (code == null) return "—";

  const description = WEATHER_CODES[code];
  return description || `Unknown (Code ${code})`;
}

/**
 * Gets a weather emoji based on the weather code
 * @param {number} code - WMO weather code
 * @returns {string} Weather emoji
 */
export function weatherCodeEmoji(code) {
  if (code == null) return "❓";

  if (code === 0) return "☀️";
  if (code >= 1 && code <= 3) return "⛅";
  if (code >= 45 && code <= 48) return "🌫️";
  if (code >= 51 && code <= 57) return "🌧️";
  if (code >= 61 && code <= 67) return "🌧️";
  if (code >= 71 && code <= 77) return "❄️";
  if (code >= 80 && code <= 82) return "🌦️";
  if (code >= 85 && code <= 86) return "🌨️";
  if (code >= 95 && code <= 99) return "⛈️";

  return "🌤️";
}

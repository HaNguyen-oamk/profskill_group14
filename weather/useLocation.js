import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { FALLBACK } from "./openMeteo";

/**
 * Error types for better error handling
 * @enum {string}
 */
const LocationErrorType = {
  PERMISSION_DENIED: "PERMISSION_DENIED",
  UNAVAILABLE: "UNAVAILABLE",
  TIMEOUT: "TIMEOUT",
  GEOCODING_FAILED: "GEOCODING_FAILED",
};

/**
 * Performs reverse geocoding to get a human-readable location name
 * @param {number} latitude - Latitude coordinate
 * @param {number} longitude - Longitude coordinate
 * @returns {Promise<string|null>} City and country name, or null if failed
 */
async function reverseGeocodeName(latitude, longitude) {
  try {
    if (!latitude || !longitude) {
      console.warn("Invalid coordinates for geocoding");
      return null;
    }

    const res = await Location.reverseGeocodeAsync({ latitude, longitude });
    const first = res?.[0];

    if (!first) {
      console.warn("No geocoding results found");
      return null;
    }

    // Try to build a descriptive location name
    const city =
      first.city || first.subregion || first.region || first.district || null;
    const country = first.country || null;

    if (city && country) return `${city}, ${country}`;
    return city || country || null;
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
}

/**
 * Custom hook to handle device location and permissions
 *
 * Features:
 * - Auto-requests location permissions
 * - Gets current GPS coordinates
 * - Reverse geocodes to get city name
 * - Falls back to default location if GPS fails
 * - Tracks loading and error states
 *
 * @returns {{
 *   coords: {latitude: number, longitude: number} | null,
 *   placeName: string,
 *   locationError: string | null,
 *   isLoading: boolean,
 *   permissionStatus: string | null,
 *   redetect: () => Promise<void>
 * }}
 */
export function useLocation() {
  // State management
  const [coords, setCoords] = useState(null);
  const [placeName, setPlaceName] = useState("Detecting location…");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState(null);

  // Prevent multiple simultaneous detection attempts
  const isDetecting = useRef(false);

  /**
   * Main function to detect user's location
   * Handles permissions, GPS, and geocoding
   */
  const detect = async () => {
    // Prevent concurrent requests
    if (isDetecting.current) {
      console.log("Location detection already in progress");
      return;
    }

    isDetecting.current = true;
    setIsLoading(true);

    try {
      setError(null);
      setPlaceName("Detecting location…");

      // Step 1: Request location permissions
      console.log("Requesting location permission...");
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);

      if (status !== "granted") {
        throw new Error(
          `${LocationErrorType.PERMISSION_DENIED}: User denied location access`,
        );
      }

      // Step 2: Get current position with timeout
      console.log("Getting GPS coordinates...");
      const pos = await Promise.race([
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        }),
        // 10 second timeout
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("GPS timeout")), 10000),
        ),
      ]);

      const { latitude, longitude } = pos.coords;

      // Validate coordinates
      if (
        typeof latitude !== "number" ||
        typeof longitude !== "number" ||
        latitude < -90 ||
        latitude > 90 ||
        longitude < -180 ||
        longitude > 180
      ) {
        throw new Error(
          `${LocationErrorType.UNAVAILABLE}: Invalid coordinates`,
        );
      }

      console.log("Coordinates obtained:", { latitude, longitude });
      setCoords({ latitude, longitude });

      // Step 3: Reverse geocode to get place name
      console.log("Reverse geocoding...");
      const name = await reverseGeocodeName(latitude, longitude);
      setPlaceName(name ?? "Your location");

      console.log("Location detection successful:", name);
    } catch (e) {
      // Enhanced error handling
      console.error("Location detection failed:", e);

      const errorMessage = String(e?.message ?? e);
      let userFriendlyError = "";

      if (errorMessage.includes(LocationErrorType.PERMISSION_DENIED)) {
        userFriendlyError =
          "Location permission denied. Please enable location access in settings.";
      } else if (errorMessage.includes("timeout")) {
        userFriendlyError =
          "GPS timeout. Please check if location services are enabled.";
      } else if (errorMessage.includes("unavailable")) {
        userFriendlyError = "GPS unavailable. This may happen on web browsers.";
      } else {
        userFriendlyError = "Could not detect location. Using fallback.";
      }

      // Set fallback location
      setCoords({
        latitude: FALLBACK.latitude,
        longitude: FALLBACK.longitude,
      });
      setPlaceName(FALLBACK.name);
      setError(`${userFriendlyError} (${errorMessage})`);
    } finally {
      setIsLoading(false);
      isDetecting.current = false;
    }
  };

  // Auto-detect location on mount
  useEffect(() => {
    detect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    coords,
    placeName,
    locationError: error,
    isLoading,
    permissionStatus,
    redetect: detect,
  };
}

import { useCallback, useEffect, useRef, useState } from "react";
import { fetchWeather } from "./openMeteo";

/**
 * Custom hook to fetch and manage weather data
 *
 * Features:
 * - Auto-fetches when coordinates change
 * - Tracks loading and error states
 * - Provides refresh functionality
 * - Prevents race conditions
 * - Caches data to avoid unnecessary requests
 *
 * @param {{latitude: number, longitude: number} | null} coords - GPS coordinates
 * @returns {{
 *   data: Object | null,
 *   error: string | null,
 *   isLoading: boolean,
 *   refreshing: boolean,
 *   refresh: () => Promise<void>,
 *   reload: () => Promise<void>
 * }}
 */
export function useWeather(coords) {
  // State management
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Track the last fetched coordinates to avoid duplicate requests
  const lastCoordsRef = useRef(null);

  // Track if component is mounted to prevent state updates after unmount
  const isMountedRef = useRef(true);

  /**
   * Check if coordinates have changed significantly
   * @param {Object} oldCoords - Previous coordinates
   * @param {Object} newCoords - New coordinates
   * @returns {boolean} True if coordinates changed significantly
   */
  const coordinatesChanged = (oldCoords, newCoords) => {
    if (!oldCoords && newCoords) return true;
    if (!newCoords) return false;

    // Check if coordinates differ by more than 0.01 degrees (~1km)
    const threshold = 0.01;
    const latDiff = Math.abs(oldCoords.latitude - newCoords.latitude);
    const lonDiff = Math.abs(oldCoords.longitude - newCoords.longitude);

    return latDiff > threshold || lonDiff > threshold;
  };

  /**
   * Main function to load weather data
   * @param {boolean} isRefresh - Whether this is a manual refresh
   */
  const load = useCallback(
    async (isRefresh = false) => {
      // Guard: check if coords are valid
      if (!coords?.latitude || !coords?.longitude) {
        console.log("Invalid coordinates, skipping weather fetch");
        return;
      }

      // Guard: prevent duplicate requests for same location
      if (
        !isRefresh &&
        lastCoordsRef.current &&
        !coordinatesChanged(lastCoordsRef.current, coords)
      ) {
        console.log("Coordinates unchanged, using cached data");
        return;
      }

      // Set appropriate loading state
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setIsLoading(true);
      }

      try {
        setError(null);
        console.log("Fetching weather data for:", coords);

        const json = await fetchWeather(coords);

        // Only update state if component is still mounted
        if (isMountedRef.current) {
          setData(json);
          lastCoordsRef.current = { ...coords };
          console.log("Weather data loaded successfully");
        }
      } catch (e) {
        console.error("Weather fetch error:", e);

        // Only update state if component is still mounted
        if (isMountedRef.current) {
          const errorMessage = String(e?.message ?? e);
          setError(errorMessage);

          // Keep old data on refresh failure
          if (!isRefresh) {
            setData(null);
          }
        }
      } finally {
        if (isMountedRef.current) {
          setIsLoading(false);
          setRefreshing(false);
        }
      }
    },
    [coords],
  );

  /**
   * Manual refresh function for pull-to-refresh
   */
  const refresh = useCallback(async () => {
    if (!coords) {
      console.warn("Cannot refresh: no coordinates available");
      return;
    }

    console.log("Manual refresh triggered");
    await load(true);
  }, [coords, load]);

  /**
   * Force reload function (clears cache)
   */
  const reload = useCallback(async () => {
    console.log("Force reload triggered");
    lastCoordsRef.current = null;
    await load(false);
  }, [load]);

  // Effect: Auto-load weather when coordinates change
  useEffect(() => {
    load(false);
  }, [load]);

  // Effect: Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      console.log("useWeather hook unmounted");
    };
  }, []);

  return {
    data,
    error,
    isLoading,
    refreshing,
    refresh,
    reload,
  };
}

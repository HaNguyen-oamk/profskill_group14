import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { FALLBACK } from "./openMeteo";

async function reverseGeocodeName(latitude, longitude) {
  try {
    const res = await Location.reverseGeocodeAsync({ latitude, longitude });
    const first = res?.[0];
    if (!first) return null;
    const city =
      first.city || first.subregion || first.region || first.district || null;
    const country = first.country || null;
    if (city && country) return `${city}, ${country}`;
    return city || country || null;
  } catch {
    return null;
  }
}

export function useLocation() {
  const [coords, setCoords] = useState(null);
  const [placeName, setPlaceName] = useState("Detecting location…");
  const [error, setError] = useState(null);

  const detect = async () => {
    try {
      setError(null);
      setPlaceName("Detecting location…");

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Location permission not granted.");
      }

      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = pos.coords;
      setCoords({ latitude, longitude });

      const name = await reverseGeocodeName(latitude, longitude);
      setPlaceName(name ?? "Your location");
    } catch (e) {
      setCoords({ latitude: FALLBACK.latitude, longitude: FALLBACK.longitude });
      setPlaceName(FALLBACK.name);
      setError(
        `GPS not available (web/browser may block). Using fallback. (${String(
          e?.message ?? e,
        )})`,
      );
    }
  };

  useEffect(() => {
    detect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { coords, placeName, locationError: error, redetect: detect };
}

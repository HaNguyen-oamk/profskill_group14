import { useEffect, useState } from "react";
import { fetchWeather } from "./openMeteo";

export function useWeather(coords) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    if (!coords) return;
    try {
      setError(null);
      const json = await fetchWeather(coords);
      setData(json);
    } catch (e) {
      setError(String(e?.message ?? e));
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coords?.latitude, coords?.longitude]);

  const refresh = async () => {
    if (!coords) return;
    setRefreshing(true);
    try {
      await load();
    } finally {
      setRefreshing(false);
    }
  };

  return { data, error, refreshing, refresh, reload: load };
}

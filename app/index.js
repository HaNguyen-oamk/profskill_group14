import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import ChartCard from "../weather/ChartCard";
import CurrentCard from "../weather/CurrentCard";
import HeaderBar from "../weather/HeaderBar";
import SegmentedTabs from "../weather/SegmentedTabs";

import { cToF, chipLabel, formatDay, formatHour } from "../weather/openMeteo";
import { theme } from "../weather/theme";
import { useLocation } from "../weather/useLocation";
import { useWeather } from "../weather/useWeather";

export default function HomeScreen() {
  const [tab, setTab] = useState("hourly"); // "hourly" | "daily"
  const [unit, setUnit] = useState("c"); // "c" | "f"

  const { coords, placeName, locationError, redetect } = useLocation();
  const { data, error: apiError, refreshing, refresh } = useWeather(coords);

  const error = locationError || apiError;

  // ---- build view models ----
  const hourlyItems = useMemo(() => {
    if (!data?.hourly?.time) return [];
    const { time, temperature_2m, precipitation_probability, wind_speed_10m } =
      data.hourly;
    const n = Math.min(24, time.length);
    const items = [];
    for (let i = 0; i < n; i++) {
      const tempC = temperature_2m?.[i];
      const temp = unit === "c" ? tempC : cToF(tempC);
      items.push({
        time: time[i],
        label: formatHour(time[i]),
        temp,
        pop: precipitation_probability?.[i] ?? null,
        wind: wind_speed_10m?.[i] ?? null,
      });
    }
    return items;
  }, [data, unit]);

  const dailyItems = useMemo(() => {
    if (!data?.daily?.time) return [];
    const {
      time,
      temperature_2m_max,
      temperature_2m_min,
      precipitation_sum,
      weather_code,
    } = data.daily;

    return time.map((day, i) => {
      const maxC = temperature_2m_max?.[i];
      const minC = temperature_2m_min?.[i];
      return {
        day,
        label: formatDay(day),
        max: unit === "c" ? maxC : cToF(maxC),
        min: unit === "c" ? minC : cToF(minC),
        rain: precipitation_sum?.[i] ?? null,
        code: weather_code?.[i] ?? null,
      };
    });
  }, [data, unit]);

  const hourlyChartData = useMemo(
    () =>
      hourlyItems.map((x, idx) => ({
        x: idx,
        y: x.temp,
        label: `${x.label}\n${x.temp.toFixed(1)} ${chipLabel(unit)}`,
      })),
    [hourlyItems, unit],
  );

  const dailyChartDataMax = useMemo(
    () =>
      dailyItems.map((x, idx) => ({
        x: idx,
        y: x.max,
        label: `${x.label}\nMax ${x.max.toFixed(1)} ${chipLabel(unit)}`,
      })),
    [dailyItems, unit],
  );

  const dailyChartDataMin = useMemo(
    () =>
      dailyItems.map((x, idx) => ({
        x: idx,
        y: x.min,
        label: `${x.label}\nMin ${x.min.toFixed(1)} ${chipLabel(unit)}`,
      })),
    [dailyItems, unit],
  );

  // ---- loading state ----
  if (!data && !error) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.muted}>Loading weather…</Text>
        <Text style={styles.muted2}>
          Web may block GPS. Use Android Emulator / phone for real GPS.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      }
    >
      <HeaderBar
        placeName={placeName}
        coords={coords}
        unit={unit}
        onToggleUnit={() => setUnit((u) => (u === "c" ? "f" : "c"))}
        onRedetect={redetect}
        error={error}
      />

      <CurrentCard current={data?.current} unit={unit} />

      <SegmentedTabs tab={tab} setTab={setTab} />

      <ChartCard
        tab={tab}
        unit={unit}
        hourlyItems={hourlyItems}
        dailyItems={dailyItems}
        hourlyChartData={hourlyChartData}
        dailyChartDataMax={dailyChartDataMax}
        dailyChartDataMin={dailyChartDataMin}
      />

      <Text style={styles.footer}>Pull down to refresh</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: theme.bg },
  content: { padding: 16, paddingBottom: 28, gap: 12 },

  center: {
    flex: 1,
    backgroundColor: theme.bg,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  muted: { color: theme.muted, fontWeight: "800" },
  muted2: { color: theme.muted2, fontSize: 12, textAlign: "center" },

  footer: {
    textAlign: "center",
    fontSize: 12,
    color: theme.muted2,
    marginTop: 2,
  },
});

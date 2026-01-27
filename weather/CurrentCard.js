import { StyleSheet, Text, View } from "react-native";
import { cToF, chipLabel, weatherCodeText } from "./openMeteo";
import { theme } from "./theme";

export default function CurrentCard({ current, unit }) {
  const t = current?.temperature_2m;
  const display = t == null ? "—" : (unit === "c" ? t : cToF(t)).toFixed(1);

  const feels = current?.apparent_temperature;
  const feelsDisplay =
    feels == null
      ? "—"
      : (unit === "c" ? feels : cToF(feels)).toFixed(1) + chipLabel(unit);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Current</Text>

      <View style={styles.row}>
        <Text style={styles.big}>
          {display}
          {chipLabel(unit)}
        </Text>

        <View style={{ flex: 1 }}>
          <Text style={styles.meta}>
            {weatherCodeText(current?.weather_code)}
          </Text>
          <Text style={styles.meta}>Feels like: {feelsDisplay}</Text>
          <Text style={styles.meta}>
            Humidity: {current?.relative_humidity_2m ?? "—"}%
          </Text>
          <Text style={styles.meta}>
            Wind: {current?.wind_speed_10m ?? "—"} km/h
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: theme.r,
    padding: theme.p,
    gap: 10,
  },
  title: { color: theme.muted, fontWeight: "900", fontSize: 13 },
  row: { flexDirection: "row", alignItems: "center", gap: 14 },
  big: {
    color: theme.text,
    fontSize: 44,
    fontWeight: "900",
    letterSpacing: -1,
  },
  meta: { color: theme.muted, fontSize: 13, marginBottom: 3 },
});

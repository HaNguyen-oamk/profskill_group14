
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { cToF, chipLabel, weatherCodeText } from "./openMeteo";
import { GlassCard, theme } from "./theme";

function formatTemp(value, unit) {
  if (value == null || Number.isNaN(value)) return "—";
  const t = unit === "c" ? value : cToF(value);
  return `${t.toFixed(1)}${chipLabel(unit)}`;
}

function Stat({ label, value }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

export default function CurrentCard({ current, unit }) {
  const temp = formatTemp(current?.temperature_2m, unit);
  const feels = formatTemp(current?.apparent_temperature, unit);

  const condition = weatherCodeText(current?.weather_code);

  const humidity =
    current?.relative_humidity_2m == null ? "—" : `${current.relative_humidity_2m}%`;

  const wind =
    current?.wind_speed_10m == null ? "—" : `${current.wind_speed_10m} km/h`;

  // Some datasets may have these; if not, it will show "—"
  const pressure =
    current?.pressure_msl == null ? "—" : `${Math.round(current.pressure_msl)} hPa`;

  const rainChance =
    current?.precipitation_probability == null ? "—" : `${current.precipitation_probability}%`;

  return (
    <GlassCard style={styles.card} intensity={18}>
      <Text style={styles.title}>Current</Text>

      <View style={styles.topRow}>
        <Text style={styles.big} numberOfLines={1}>
          {temp}
        </Text>

        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={styles.condition} numberOfLines={1}>
            {condition}
          </Text>
          <Text style={styles.meta} numberOfLines={1}>
            Feels like: {feels}
          </Text>
        </View>
      </View>

      <View style={styles.statsWrap}>
        <Stat label="Humidity" value={humidity} />
        <Stat label="Wind" value={wind} />
        <Stat label="Rain" value={rainChance} />
        <Stat label="Pressure" value={pressure} />
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 22,
  },

  title: {
    color: theme.muted,
    fontWeight: "900",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 10,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  big: {
    color: theme.text,
    fontSize: 62,
    fontWeight: "900",
    letterSpacing: -2,
  },

  condition: {
    color: theme.text,
    fontSize: 16,
    fontWeight: "800",
  },

  meta: {
    marginTop: 4,
    color: theme.muted,
    fontSize: 13,
    fontWeight: "700",
  },

  statsWrap: {
    marginTop: 14,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  statItem: {
    width: "48%",
    padding: 12,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: theme.border,
  },

  statLabel: {
    color: theme.muted2,
    fontSize: 12,
    fontWeight: "800",
  },

  statValue: {
    marginTop: 6,
    color: theme.text,
    fontSize: 14,
    fontWeight: "900",
  },
});


// dailyItems element shape from index.js:
// { day, label, max, min, rain, code }

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { chipLabel, weatherCodeText } from "./openMeteo";
import { theme } from "./theme";

function safeNum(x) {
  return typeof x === "number" && !Number.isNaN(x);
}
function codeToEmoji(code) {
    if (code == null) return "—";
    if (code === 0) return "☀️";
    if (code <= 3) return "⛅";
    if (code >= 45 && code <= 48) return "🌫️";
    if (code >= 51 && code <= 67) return "🌧️";
    if (code >= 71 && code <= 77) return "❄️";
    if (code >= 80 && code <= 82) return "🌦️";
    if (code >= 95) return "⛈️";
    return "⛅";
  }
  
export default function DailyForecastList({
  dailyItems,   
  items,        
  unit = "c",
  limit = 7,
  showRangeBar = true, 
}) {
  const data = (dailyItems ?? items ?? []).slice(0, limit);

  // For range bar: find min of mins and max of maxes (for consistent scale)
  const allMins = data.map((d) => d?.min).filter(safeNum);
  const allMaxs = data.map((d) => d?.max).filter(safeNum);

  const minAll = allMins.length ? Math.min(...allMins) : null;
  const maxAll = allMaxs.length ? Math.max(...allMaxs) : null;
  const span = minAll != null && maxAll != null ? maxAll - minAll : null;

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>7-day forecast</Text>

      <View style={styles.list}>
        {data.map((d, idx) => {
          const minText = safeNum(d?.min) ? `${Math.round(d.min)}°` : "—";
          const maxText = safeNum(d?.max) ? `${Math.round(d.max)}°` : "—";

          const rainText =
            d?.rain == null ? "—" : `${Math.round(d.rain)} mm`;

          const condition = weatherCodeText(d?.code);

          // range bar calculations 
          let startPct = 0;
          let widthPct = 0;
          if (
            showRangeBar &&
            span != null &&
            span > 0 &&
            safeNum(d?.min) &&
            safeNum(d?.max)
          ) {
            startPct = (d.min - minAll) / span;
            widthPct = (d.max - d.min) / span;
          }

          return (
            <View
              key={String(d?.day ?? idx)}
              style={[styles.row, idx !== 0 && styles.rowBorder]}
            >
              <Text style={styles.day}>{d?.label ?? "—"}</Text>

              <View style={styles.mid}>
              <Text style={styles.icon}>{codeToEmoji(d?.code)}</Text>

                <Text style={styles.cond} numberOfLines={1}>
                  {condition}
                </Text>
              </View>

              {showRangeBar ? (
                <View style={styles.barWrap}>
                  <View style={styles.barBase}>
                    <View
                      style={[
                        styles.barFill,
                        {
                          left: `${Math.round(startPct * 100)}%`,
                          width: `${Math.max(2, Math.round(widthPct * 100))}%`,

                        },
                      ]}
                    />
                  </View>
                </View>
              ) : null}

              <View style={styles.temps}>
                <Text style={styles.min}>{minText}</Text>
                <Text style={styles.max}>{maxText}</Text>
              </View>

              <Text style={styles.rain} numberOfLines={1}>
                {rainText}
              </Text>
            </View>
          );
        })}
      </View>

      <Text style={styles.unitHint}>Unit: {chipLabel(unit)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: theme.r,
    padding: theme.p,
    gap: 10,
  },
  title: {
    color: theme.muted,
    fontWeight: "900",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },

  list: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 12,
    paddingHorizontal: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 10,
  },
  rowBorder: {
    borderTopWidth: 0.5,
    borderTopColor: "rgba(255,255,255,0.10)",
  },

  day: {
    width: 52,
    color: theme.text,
    fontWeight: "800",
    fontSize: 13,
  },

  mid: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    width: 130,
  },
  icon: { fontSize: 14 },
  cond: {
    color: theme.muted,
    fontSize: 12,
    fontWeight: "700",
    flexShrink: 1,
  },

  barWrap: {
    flex: 1,
    justifyContent: "center",
  },
  barBase: {
    height: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.10)",
    overflow: "hidden",
    position: "relative",
  },
  barFill: {
    position: "absolute",
    height: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.50)",
  },

  temps: {
    flexDirection: "row",
    gap: 8,
    width: 80,
    justifyContent: "flex-end",
  },
  min: { color: theme.muted2, fontWeight: "900" },
  max: { color: theme.text, fontWeight: "900" },

  rain: {
    width: 56,
    textAlign: "right",
    color: theme.muted2,
    fontSize: 11,
    fontWeight: "700",
  },

  unitHint: {
    color: theme.muted2,
    fontSize: 11,
    fontWeight: "700",
    textAlign: "right",
  },
});

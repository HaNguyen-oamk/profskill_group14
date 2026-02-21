
// hourlyItems element shape from index.js:
// { time, label, temp, pop, wind }

import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { chipLabel } from "./openMeteo";
import { theme } from "./theme";

function safeNum(x) {
  return typeof x === "number" && !Number.isNaN(x);
}

export default function HourlyList({
  hourlyItems,   
  items,         
  unit = "c",
  limit = 12,    
}) {
  const data = (hourlyItems ?? items ?? []).slice(0, limit);

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Hourly</Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item, idx) => String(item?.time ?? idx)}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const tempText = safeNum(item?.temp)
            ? `${item.temp.toFixed(0)}${chipLabel(unit)}`
            : "—";

          const popText =
            item?.pop == null ? "—" : `${Math.round(item.pop)}%`;

          const windText =
            item?.wind == null ? "—" : `${Math.round(item.wind)} km/h`;

          return (
            <View style={styles.item}>
              <Text style={styles.time}>{item?.label ?? "—"}</Text>

              {/* optional icon slot later */}
              <Text style={styles.icon}>⛅</Text>

              <Text style={styles.temp}>{tempText}</Text>
              <Text style={styles.meta}>POP {popText}</Text>
              <Text style={styles.meta}>Wind {windText}</Text>
            </View>
          );
        }}
      />
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
  listContent: {
    gap: 10,
    paddingRight: 6,
  },
  item: {
    width: 88,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: theme.card2,
    borderWidth: 1,
    borderColor: theme.border,
    alignItems: "center",
  },
  time: {
    color: theme.muted2,
    fontSize: 12,
    fontWeight: "800",
  },
  icon: {
    marginVertical: 8,
    fontSize: 18,
  },
  temp: {
    color: theme.text,
    fontSize: 16,
    fontWeight: "900",
  },
  meta: {
    marginTop: 4,
    color: theme.muted2,
    fontSize: 11,
    fontWeight: "700",
  },
});

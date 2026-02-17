import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { chipLabel, weatherCodeText } from "./openMeteo";
import { theme } from "./theme";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
} from "./VictoryCompat";

function ChartWrapper({ children }) {
  return (
    <View style={{ width: "100%", overflow: "hidden", borderRadius: 14 }}>
      {children}
    </View>
  );
}

function Row({ left, mid, right, first }) {
  return (
    <View style={[styles.row, !first && styles.rowBorder]}>
      <Text style={styles.rowLeft}>{left}</Text>
      <Text style={styles.rowMid}>{mid}</Text>
      <Text style={styles.rowRight} numberOfLines={1}>
        {right}
      </Text>
    </View>
  );
}

const CHART = {
  lineHourly: "#4FC3F7",
  lineMax: "#FFB74D",
  lineMin: "#4FC3F7",
  axis: "rgba(234,240,255,0.15)",
  tick: "#ffffff",
  grid: "transparent",
};

const axisStyleX = {
  axis: { stroke: CHART.axis },
  grid: { stroke: CHART.grid },
  tickLabels: {
    fontSize: 10,
    padding: 8,
    fill: "#ffffff",
    fontWeight: "500",
  },
};

const axisStyleY = {
  axis: { stroke: CHART.axis },
  grid: { stroke: CHART.grid },
  tickLabels: {
    fontSize: 10,
    padding: 5,
    fill: "#ffffff",
    fontWeight: "500",
  },
};

export default function ChartCard({
  tab,
  unit,
  hourlyItems,
  dailyItems,
  hourlyChartData,
  dailyChartDataMax,
  dailyChartDataMin,
}) {
  const [selectedPoint, setSelectedPoint] = useState(null);

  // 🚨 STRIP LABELS FROM DATA - This removes the label property completely
  const cleanHourlyData = hourlyChartData?.map(({ x, y }) => ({ x, y })) || [];
  const cleanDailyMaxData = dailyChartDataMax?.map(({ x, y }) => ({ x, y })) || [];
  const cleanDailyMinData = dailyChartDataMin?.map(({ x, y }) => ({ x, y })) || [];

  if (tab === "hourly") {
    const xTicks = [0, 3, 6, 9, 12, 15, 18, 21, 23];

    return (
      <View style={styles.card}>
        <Text style={styles.title}>Next 24 hours temperature</Text>
        <ChartWrapper>
          <VictoryChart
            height={220}
            padding={{ top: 20, bottom: 45, left: 45, right: 20 }}
            events={[]}
            standalone={true}
          >
            <VictoryAxis
              tickValues={xTicks}
              tickFormat={(t) => hourlyItems[t]?.label ?? ""}
              style={axisStyleX}
              events={[]}
              standalone={true}
            />
            <VictoryAxis
              dependentAxis
              tickCount={4}
              tickFormat={(t) => `${Math.round(t)}°`}
              style={axisStyleY}
              events={[]}
              standalone={true}
            />
            <VictoryLine
              data={cleanHourlyData}
              interpolation="basis"
              labels={null}
              events={[]}
              standalone={true}
              style={{
                data: {
                  stroke: CHART.lineHourly,
                  strokeWidth: 3.5,
                  strokeLinecap: "round",
                },
              }}
            />
            <VictoryScatter
  data={cleanHourlyData}
  size={({ index }) => selectedPoint?.index === index ? 10 : 6}
  style={{
    data: {
      fill: ({ index }) => 
        selectedPoint?.index === index ? "#FFD700" : CHART.lineHourly, // Gold when selected
    },
              }}
              events={[{
                target: "data",
                eventHandlers: {
                  onClick: (evt, clickedProps) => {
                    // Use original data for the label since cleaned data has no label
                    const originalPoint = hourlyChartData[clickedProps.index];
                    if (selectedPoint?.index === clickedProps.index) {
                      setSelectedPoint(null);
                    } else {
                      setSelectedPoint({
                        index: clickedProps.index,
                        datum: originalPoint,
                      });
                    }
                  },
                },
              }]}
              standalone={true}
            />
          </VictoryChart>
        </ChartWrapper>

        {selectedPoint && (
          <View style={styles.selectedInfo}>
            <Text style={styles.selectedText}>
              Selected: {selectedPoint.datum.label}
            </Text>
          </View>
        )}

        <View style={styles.listSection}>
          {hourlyItems.slice(0, 8).map((h, idx) => (
            <Row
              key={h.time}
              first={idx === 0}
              left={h.label}
              mid={`${h.temp.toFixed(1)}${chipLabel(unit)}`}
              right={`POP ${h.pop}% · Wind ${h.wind} km/h`}
            />
          ))}
        </View>
      </View>
    );
  }

  const xTicksDaily = [0, 1, 2, 3, 4, 5, 6];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>7-day temperature (min/max)</Text>

        
    {/* ✅ INFO BOX - Explains the lines */}
    <View style={styles.infoBox}>
      <View style={styles.infoRow}>
        <View style={[styles.lineSample, { backgroundColor: CHART.lineMax }]} />
        <Text style={styles.infoText}>Minimum temperature (warmest)</Text>
      </View>
      <View style={styles.infoRow}>
        <View style={[styles.lineSample, { backgroundColor: CHART.lineMin, borderWidth: 1, borderColor: '#ffffff', borderStyle: 'dashed' }]} />
        <Text style={styles.infoText}>Maximum temperature (coldest)</Text>
      </View>
    </View>

      <ChartWrapper>
        <VictoryChart
          height={220}
          padding={{ top: 20, bottom: 45, left: 45, right: 20 }}
          events={[]}
          standalone={true}
        >
          <VictoryAxis
            events={[]}
            standalone={true}
            tickValues={xTicksDaily}
            tickFormat={(t) => dailyItems[t]?.label ?? ""}
            style={axisStyleX}
          />
          <VictoryAxis
            events={[]}
            standalone={true}
            dependentAxis
            tickCount={4}
            tickFormat={(t) => `${Math.round(t)}°`}
            style={axisStyleY}
          />
          <VictoryLine
            data={cleanDailyMaxData}
            interpolation="basis"
            labels={null}
            events={[]}
            standalone={true}
            style={{
              data: { stroke: CHART.lineMax, strokeWidth: 3 },
            }}
          />
          <VictoryLine
            data={cleanDailyMinData}
            interpolation="natural"
            labels={null}
            events={[]}
            standalone={true}
            style={{
              data: {
                stroke: CHART.lineMin,
                strokeWidth: 3,
                strokeDasharray: "4,4",
              },
            }}
          />
        </VictoryChart>
      </ChartWrapper>
      <View style={styles.listSection}>
        {dailyItems.map((d, idx) => (
          <Row
            key={d.day}
            first={idx === 0}
            left={d.label}
            mid={`${d.min.toFixed(0)}°–${d.max.toFixed(0)}°${chipLabel(unit)}`}
            right={`${weatherCodeText(d.code)} · Rain ${d.rain ?? 0} mm`}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.card,
    borderRadius: 18,
    padding: 16,
    marginVertical: 10,
  },
  title: {
    color: theme.muted,
    fontWeight: "700",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 5,
  },
  listSection: {
    marginTop: 10,
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  row: { flexDirection: "row", alignItems: "center", paddingVertical: 12 },
  rowBorder: { borderTopWidth: 0.5, borderTopColor: "rgba(255,255,255,0.1)" },
  rowLeft: { width: 50, color: "#ffffff", fontWeight: "600", fontSize: 13 },
  rowMid: { width: 110, color: "#ffffff", fontWeight: "700", fontSize: 13 },
  rowRight: { flex: 1, color: "#cccccc", fontSize: 11, textAlign: "right" },
  selectedInfo: {
    backgroundColor: "#1e293b",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#60a5fa",
  },
  selectedText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  infoBox: {
  backgroundColor: 'rgba(30, 41, 59, 0.8)', // Dark blue like your tooltips
  borderRadius: 10,
  padding: 10,
  marginBottom: 12,
  borderWidth: 1,
  borderColor: '#60a5fa', // Light blue border
},
infoRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 4,
},
lineSample: {
  width: 24,
  height: 3,
  borderRadius: 2,
  marginRight: 10,
},
infoText: {
  color: '#ffffff',
  fontSize: 12,
  fontWeight: '400',
},
});
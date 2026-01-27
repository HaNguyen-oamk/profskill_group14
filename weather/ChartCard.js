import { Platform, StyleSheet, Text, View } from "react-native";
import { chipLabel, weatherCodeText } from "./openMeteo";
import { theme } from "./theme";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTooltip,
  VictoryVoronoiContainer,
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
  tick: "rgba(255,255,255,0.7)",
  grid: "transparent",
};

const axisStyleX = {
  axis: { stroke: CHART.axis },
  grid: { stroke: CHART.grid },
  tickLabels: {
    fontSize: 8,
    padding: 12,
    fill: CHART.tick,
  },
};

const axisStyleY = {
  axis: { stroke: CHART.axis },
  grid: { stroke: CHART.grid },
  tickLabels: {
    fontSize: 8,
    padding: 10,
    fill: CHART.tick,
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
  const container =
    Platform.OS === "web" ? undefined : (
      <VictoryVoronoiContainer
        labels={({ datum }) => datum.label}
        labelComponent={
          <VictoryTooltip
            flyoutStyle={{
              stroke: "none",
              fill: "rgba(15,23,42,0.9)",
            }}
            style={{ fill: "white", fontSize: 10 }}
            cornerRadius={5}
          />
        }
      />
    );

  if (tab === "hourly") {
    // Giảm số lượng ticks để tránh chồng lấn nhãn trục X
    const xTicks = [0, 6, 12, 18, 23];

    return (
      <View style={styles.card}>
        <Text style={styles.title}>Next 24 hours temperature</Text>
        <ChartWrapper>
          <VictoryChart
            height={220}
            padding={{ top: 20, bottom: 45, left: 45, right: 20 }}
            containerComponent={container}
          >
            <VictoryAxis
              tickValues={xTicks}
              tickFormat={(t) => hourlyItems[t]?.label ?? ""}
              style={axisStyleX}
            />
            <VictoryAxis
              dependentAxis
              tickCount={4}
              tickFormat={(t) => `${Math.round(t)}°`}
              style={axisStyleY}
            />
            <VictoryLine
              data={hourlyChartData}
              interpolation="natural"
              // Vô hiệu hóa hoàn toàn nhãn đè lên line
              labels={undefined}
              labelComponent={<View />}
              style={{
                data: {
                  stroke: CHART.lineHourly,
                  strokeWidth: 3.5,
                  strokeLinecap: "round",
                },
              }}
            />
          </VictoryChart>
        </ChartWrapper>
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

  // Daily tab
  const xTicksDaily = [0, 2, 4, 6];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>7-day temperature (min/max)</Text>
      <ChartWrapper>
        <VictoryChart
          height={220}
          padding={{ top: 20, bottom: 45, left: 45, right: 20 }}
          containerComponent={container}
        >
          <VictoryAxis
            tickValues={xTicksDaily}
            tickFormat={(t) => dailyItems[t]?.label ?? ""}
            style={axisStyleX}
          />
          <VictoryAxis
            dependentAxis
            tickCount={4}
            tickFormat={(t) => `${Math.round(t)}°`}
            style={axisStyleY}
          />
          <VictoryLine
            data={dailyChartDataMax}
            interpolation="natural"
            labels={undefined}
            labelComponent={<View />}
            style={{
              data: { stroke: CHART.lineMax, strokeWidth: 3 },
            }}
          />
          <VictoryLine
            data={dailyChartDataMin}
            interpolation="natural"
            labels={undefined}
            labelComponent={<View />}
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
  rowLeft: { width: 50, color: theme.text, fontWeight: "600", fontSize: 13 },
  rowMid: { width: 110, color: theme.text, fontWeight: "700", fontSize: 13 },
  rowRight: { flex: 1, color: theme.muted2, fontSize: 11, textAlign: "right" },
});

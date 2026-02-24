/**
 * ChartCard.native.js
 * Native-specific chart card using react-native-svg
 * Metro bundler auto-picks this file on iOS/Android instead of ChartCard.js
 */
import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Svg, {
    Circle,
    G,
    Polyline,
    Line as SvgLine,
    Text as SvgText,
} from "react-native-svg";
import { theme } from "./theme";

// ─── Chart colours ───────────────────────────────────────────────────────────
const CHART = {
  lineHourly: "#4FC3F7",
  lineMax: "#FFB74D",
  lineMin: "#4FC3F7",
  axis: "rgba(234,240,255,0.15)",
  tick: "#ffffff",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const PAD = { top: 20, bottom: 45, left: 48, right: 20 };

function useChartWidth() {
  const screenW = Dimensions.get("window").width;
  return Math.min(screenW - 32, 500); // 16px padding each side
}

function scaleY(data, height) {
  const ys = data.map((d) => d.y);
  const yMin = Math.min(...ys);
  const yMax = Math.max(...ys);
  const range = yMax - yMin || 1;
  const lo = yMin - range * 0.05;
  const hi = yMax + range * 0.05;
  const rng = hi - lo;
  const cH = height - PAD.top - PAD.bottom;
  return { lo, hi, rng, cH, toY: (v) => PAD.top + cH - ((v - lo) / rng) * cH };
}

function toX(i, len, chartW) {
  if (len <= 1) return PAD.left;
  return PAD.left + (i / (len - 1)) * chartW;
}

// ─── SVG axis & grid ─────────────────────────────────────────────────────────
function YAxis({ lo, rng, toY, width, tickCount = 4 }) {
  const ticks = [];
  for (let i = 0; i <= tickCount; i++) {
    const val = lo + (rng * i) / tickCount;
    ticks.push(val);
  }
  return ticks.map((val, i) => (
    <G key={`yt${i}`}>
      <SvgLine
        x1={PAD.left}
        y1={toY(val)}
        x2={width - PAD.right}
        y2={toY(val)}
        stroke={CHART.axis}
      />
      <SvgText
        x={PAD.left - 8}
        y={toY(val) + 4}
        fontSize={10}
        fill={CHART.tick}
        textAnchor="end"
        fontWeight="500"
      >
        {`${Math.round(val)}°`}
      </SvgText>
    </G>
  ));
}

function XAxisLabels({ indices, labels, len, chartW, height }) {
  return indices.map((idx) => (
    <SvgText
      key={`xl${idx}`}
      x={toX(idx, len, chartW)}
      y={height - 8}
      fontSize={10}
      fill={CHART.tick}
      textAnchor="middle"
      fontWeight="500"
    >
      {labels[idx] ?? ""}
    </SvgText>
  ));
}

// ─── Single-line chart (hourly) ──────────────────────────────────────────────
function SingleLineChart({
  data,
  height,
  color,
  strokeWidth = 3.5,
  xTickIndices,
  xTickLabels,
  selectedIndex,
  onPointPress,
}) {
  const width = useChartWidth();
  if (!data || data.length < 2) return null;

  const chartW = width - PAD.left - PAD.right;
  const { lo, rng, toY } = scaleY(data, height);

  const pts = data
    .map(
      (d, i) =>
        `${toX(i, data.length, chartW).toFixed(1)},${toY(d.y).toFixed(1)}`,
    )
    .join(" ");

  return (
    <View style={{ alignItems: "center" }}>
      <Svg width={width} height={height}>
        <YAxis lo={lo} rng={rng} toY={toY} width={width} />
        <XAxisLabels
          indices={xTickIndices}
          labels={xTickLabels}
          len={data.length}
          chartW={chartW}
          height={height}
        />

        {/* baseline */}
        <SvgLine
          x1={PAD.left}
          y1={height - PAD.bottom}
          x2={width - PAD.right}
          y2={height - PAD.bottom}
          stroke={CHART.axis}
        />

        {/* line */}
        <Polyline
          points={pts}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* dots */}
        {data.map((d, i) => (
          <Circle
            key={`p${i}`}
            cx={toX(i, data.length, chartW)}
            cy={toY(d.y)}
            r={selectedIndex === i ? 10 : 5}
            fill={selectedIndex === i ? "#FFD700" : color}
            onPress={() => onPointPress?.(i, d)}
          />
        ))}
      </Svg>
    </View>
  );
}

// ─── Dual-line chart (daily min/max) ─────────────────────────────────────────
function DualLineChart({
  dataMax,
  dataMin,
  height,
  colorMax = CHART.lineMax,
  colorMin = CHART.lineMin,
  strokeWidth = 3,
  xTickIndices,
  xTickLabels,
}) {
  const width = useChartWidth();
  if (!dataMax || dataMax.length < 2) return null;

  const allData = [...dataMax, ...dataMin];
  const chartW = width - PAD.left - PAD.right;
  const { lo, rng, toY } = scaleY(allData, height);

  const len = Math.max(dataMax.length, dataMin.length);
  const mkPts = (arr) =>
    arr
      .map((d, i) => `${toX(i, len, chartW).toFixed(1)},${toY(d.y).toFixed(1)}`)
      .join(" ");

  return (
    <View style={{ alignItems: "center" }}>
      <Svg width={width} height={height}>
        <YAxis lo={lo} rng={rng} toY={toY} width={width} />
        <XAxisLabels
          indices={xTickIndices}
          labels={xTickLabels}
          len={len}
          chartW={chartW}
          height={height}
        />
        <SvgLine
          x1={PAD.left}
          y1={height - PAD.bottom}
          x2={width - PAD.right}
          y2={height - PAD.bottom}
          stroke={CHART.axis}
        />

        {/* Max line (solid) */}
        <Polyline
          points={mkPts(dataMax)}
          fill="none"
          stroke={colorMax}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Min line (dashed) */}
        <Polyline
          points={mkPts(dataMin)}
          fill="none"
          stroke={colorMin}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeDasharray="4,4"
        />
      </Svg>
    </View>
  );
}

// ─── Main ChartCard (native version) ─────────────────────────────────────────
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

  // Build x-axis label arrays
  const hourlyXLabels = {};
  const hourlyXTicks = [0, 3, 6, 9, 12, 15, 18, 21, 23];
  hourlyXTicks.forEach((i) => {
    hourlyXLabels[i] = hourlyItems[i]?.label ?? "";
  });

  const dailyXLabels = {};
  const dailyXTicks = [0, 1, 2, 3, 4, 5, 6];
  dailyXTicks.forEach((i) => {
    dailyXLabels[i] = dailyItems[i]?.label ?? "";
  });

  if (tab === "hourly") {
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Next 24 hours temperature</Text>

        <SingleLineChart
          data={hourlyChartData}
          height={220}
          color={CHART.lineHourly}
          xTickIndices={hourlyXTicks}
          xTickLabels={hourlyXLabels}
          selectedIndex={selectedPoint?.index}
          onPointPress={(i, d) => {
            const original = hourlyChartData[i];
            if (selectedPoint?.index === i) {
              setSelectedPoint(null);
            } else {
              setSelectedPoint({ index: i, datum: original });
            }
          }}
        />

        {selectedPoint && (
          <View style={styles.selectedInfo}>
            <Text style={styles.selectedText}>
              Selected: {selectedPoint.datum.label}
            </Text>
          </View>
        )}
      </View>
    );
  }

  // ─── daily tab ─────────────────────────────────────────────────────────────
  return (
    <View style={styles.card}>
      <Text style={styles.title}>7-day temperature (min/max)</Text>

      {/* Legend */}
      <View style={styles.infoBox}>
        <View style={styles.infoRow}>
          <View
            style={[styles.lineSample, { backgroundColor: CHART.lineMax }]}
          />
          <Text style={styles.infoText}>Maximum temperature (warmest)</Text>
        </View>
        <View style={styles.infoRow}>
          <View
            style={[
              styles.lineSample,
              {
                backgroundColor: CHART.lineMin,
                borderWidth: 1,
                borderColor: "#ffffff",
                borderStyle: "dashed",
              },
            ]}
          />
          <Text style={styles.infoText}>Minimum temperature (coldest)</Text>
        </View>
      </View>

      <DualLineChart
        dataMax={dailyChartDataMax}
        dataMin={dailyChartDataMin}
        height={220}
        xTickIndices={dailyXTicks}
        xTickLabels={dailyXLabels}
      />
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
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
    backgroundColor: "rgba(30, 41, 59, 0.8)",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#60a5fa",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  lineSample: {
    width: 24,
    height: 3,
    borderRadius: 2,
    marginRight: 10,
  },
  infoText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "400",
  },
});

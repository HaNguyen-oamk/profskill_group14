
import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "./theme";

export default function SegmentedTabs({ tab, setTab }) {
  return (
    <View style={styles.wrap}>
      <Pressable
        accessibilityRole="tab"
        accessibilityState={{ selected: tab === "hourly" }}
        android_ripple={{ color: "rgba(255,255,255,0.10)" }}
        style={({ pressed }) => [
          styles.item,
          tab === "hourly" && styles.active,
          pressed && styles.pressed,
        ]}
        onPress={() => setTab("hourly")}
      >
        <Text style={[styles.text, tab === "hourly" && styles.textActive]}>
          Hourly
        </Text>
      </Pressable>

      <Pressable
        accessibilityRole="tab"
        accessibilityState={{ selected: tab === "daily" }}
        android_ripple={{ color: "rgba(255,255,255,0.10)" }}
        style={({ pressed }) => [
          styles.item,
          tab === "daily" && styles.active,
          pressed && styles.pressed,
        ]}
        onPress={() => setTab("daily")}
      >
        <Text style={[styles.text, tab === "daily" && styles.textActive]}>
          Daily
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 999,
    overflow: "hidden",
  },
  item: { flex: 1, paddingVertical: 10, alignItems: "center" },
  active: { backgroundColor: "rgba(255,255,255,0.08)" },
  pressed: { opacity: 0.85 },
  text: { color: theme.muted2, fontWeight: "900", fontSize: 13 },
  textActive: { color: theme.text },
});

import { Pressable, StyleSheet, Text, View } from "react-native";
import { theme } from "./theme";

export default function SegmentedTabs({ tab, setTab }) {
  return (
    <View style={styles.wrap}>
      <Pressable
        style={[styles.item, tab === "hourly" && styles.active]}
        onPress={() => setTab("hourly")}
      >
        <Text style={[styles.text, tab === "hourly" && styles.textActive]}>
          Hourly
        </Text>
      </Pressable>

      <Pressable
        style={[styles.item, tab === "daily" && styles.active]}
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
  item: { flex: 1, paddingVertical: 12, alignItems: "center" },
  active: { backgroundColor: "rgba(255,255,255,0.08)" },
  text: { color: theme.muted2, fontWeight: "900" },
  textActive: { color: theme.text },
});

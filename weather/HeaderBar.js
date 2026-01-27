import { Pressable, StyleSheet, Text, View } from "react-native";
import { chipLabel } from "./openMeteo";
import { theme } from "./theme";

export default function HeaderBar({
  placeName,
  coords,
  unit,
  onToggleUnit,
  onRedetect,
  error,
}) {
  return (
    <View style={styles.header}>
      <View style={{ flex: 1 }}>
        <Text style={styles.location}>{placeName}</Text>
        <Text style={styles.subtitle}>
          {coords
            ? `Lat ${coords.latitude.toFixed(
                3,
              )}, Lon ${coords.longitude.toFixed(3)}`
            : " "}
        </Text>
        {error ? <Text style={styles.warnText}>{error}</Text> : null}
      </View>

      <View style={{ gap: 10, alignItems: "flex-end" }}>
        <Pressable style={styles.chip} onPress={onToggleUnit}>
          <Text style={styles.chipBig}>{chipLabel(unit)}</Text>
          <Text style={styles.chipSmall}>Tap</Text>
        </Pressable>

        <Pressable style={styles.btn} onPress={onRedetect}>
          <Text style={styles.btnText}>Re-detect</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  location: { fontSize: 22, fontWeight: "900", color: theme.text },
  subtitle: { marginTop: 4, fontSize: 12, color: theme.muted2 },
  warnText: { marginTop: 8, fontSize: 12, color: theme.danger },

  chip: {
    backgroundColor: theme.card2,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    minWidth: 74,
  },
  chipBig: { color: theme.text, fontWeight: "900", fontSize: 16 },
  chipSmall: { color: theme.muted2, fontSize: 11, marginTop: 2 },

  btn: {
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  btnText: { color: theme.text, fontWeight: "900", fontSize: 12 },
});

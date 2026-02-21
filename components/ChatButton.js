import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function ChatButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.chatButton} onPress={onPress}>
      <Text style={styles.icon}>💬</Text>
      <Text style={styles.text}>Chat</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chatButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#007AFF",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  icon: {
    fontSize: 20,
    marginRight: 8,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

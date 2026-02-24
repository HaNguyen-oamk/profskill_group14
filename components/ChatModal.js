// components/ChatModal.js
import { useEffect, useRef, useState } from "react";
import {
    Dimensions,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { sendMessage } from "../services/groq";
import { weatherCodeText } from "../weather/openMeteo";

async function getWeatherForLocation(cityName, unit = "c") {
  try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      cityName,
    )}&count=1&language=en&format=json`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) return null;

    const { latitude, longitude, name, country } = geoData.results[0];

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m,apparent_temperature&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=3`;
    const weatherRes = await fetch(weatherUrl);
    const weatherData = await weatherRes.json();

    const current = weatherData.current;
    const temp =
      unit === "c"
        ? current.temperature_2m
        : (current.temperature_2m * 9) / 5 + 32;

    return {
      location: `${name}, ${country}`,
      temperature: temp.toFixed(1),
      condition: weatherCodeText(current.weather_code),
      humidity: current.relative_humidity_2m,
      wind: current.wind_speed_10m,
      forecast: weatherData.daily?.time
        ?.slice(0, 3)
        .map((day, i) => {
          const max =
            unit === "c"
              ? weatherData.daily.temperature_2m_max[i]
              : (weatherData.daily.temperature_2m_max[i] * 9) / 5 + 32;
          const min =
            unit === "c"
              ? weatherData.daily.temperature_2m_min[i]
              : (weatherData.daily.temperature_2m_min[i] * 9) / 5 + 32;
          return `${day}: ${max.toFixed(0)}°/${min.toFixed(0)}°`;
        })
        .join(", "),
    };
  } catch (error) {
    return null;
  }
}

export default function ChatModal({
  visible,
  onClose,
  weatherData,
  placeName,
  unit,
}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Scroll ref for auto-scroll
  const scrollRef = useRef(null);

  const scrollToBottom = (animated = true) => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollToEnd({ animated });
    });
  };

  // When modal opens or messages update, keep at bottom
  useEffect(() => {
    if (visible) scrollToBottom(false);
  }, [visible]);

  useEffect(() => {
    if (visible) scrollToBottom(true);
  }, [messages.length, visible]);

  const buildSystemPrompt = () => {
    if (!weatherData?.current) {
      return "You are a helpful weather assistant. Answer in English, be concise and friendly.";
    }

    const current = weatherData.current;
    const temp =
      unit === "c"
        ? current.temperature_2m
        : (current.temperature_2m * 9) / 5 + 32;
    const feels =
      unit === "c"
        ? current.apparent_temperature
        : (current.apparent_temperature * 9) / 5 + 32;

    return `You are a weather assistant AI.

CURRENT LOCATION: ${placeName || "Unknown"}

CURRENT WEATHER DATA:
- Temperature: ${temp.toFixed(1)}°${unit.toUpperCase()}
- Feels like: ${feels.toFixed(1)}°${unit.toUpperCase()}
- Condition: ${weatherCodeText(current.weather_code)}
- Humidity: ${current.relative_humidity_2m}%
- Wind speed: ${current.wind_speed_10m} km/h

7-DAY FORECAST (${placeName || "Unknown"}):
${weatherData.daily?.time
  ?.slice(0, 7)
  .map((day, i) => {
    const maxTemp =
      unit === "c"
        ? weatherData.daily.temperature_2m_max[i]
        : (weatherData.daily.temperature_2m_max[i] * 9) / 5 + 32;
    const minTemp =
      unit === "c"
        ? weatherData.daily.temperature_2m_min[i]
        : (weatherData.daily.temperature_2m_min[i] * 9) / 5 + 32;
    return `${day}: ${maxTemp.toFixed(0)}°/${minTemp.toFixed(
      0,
    )}° - ${weatherCodeText(weatherData.daily.weather_code[i])}`;
  })
  .join("\n")}

Be conversational and helpful.`;
  };

  const handleSend = async () => {
    if (loading) return;
    const text = input.trim();
    if (!text) return;

    const userMsg = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Detect if asking about another city
      const cityPattern = /weather (?:in|at|for) ([a-zA-Z\s]+)/i;
      const match = text.match(cityPattern);

      let enhancedPrompt = text;

      if (match && match[1]) {
        const cityName = match[1].trim();
        const weatherInfo = await getWeatherForLocation(cityName, unit);

        if (weatherInfo) {
          enhancedPrompt = `User asked: "${text}"

Weather data for ${weatherInfo.location}:
- Temperature: ${weatherInfo.temperature}°${unit.toUpperCase()}
- Condition: ${weatherInfo.condition}
- Humidity: ${weatherInfo.humidity}%
- Wind: ${weatherInfo.wind} km/h
- 3-day forecast: ${weatherInfo.forecast}

Reply friendly and concise.`;
        } else {
          enhancedPrompt = `User asked: "${text}"

Could not find weather data for "${cityName}". Politely say so and offer current location (${placeName || "your location"}).`;
        }
      }

      const systemPrompt = buildSystemPrompt();
      const history = [
        { role: "system", parts: [{ text: systemPrompt }] },
        ...messages.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        })),
      ];

      const reply = await sendMessage(enhancedPrompt, history);
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: `❌ ${error?.message || "Error"}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.modalContainer}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>💬 AI Weather Chat</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Messages */}
          <ScrollView
            style={styles.messages}
            ref={scrollRef}
            keyboardShouldPersistTaps="handled"
            onContentSizeChange={() => scrollToBottom(true)}
          >
            {messages.length === 0 && (
              <Text style={styles.placeholder}>
                Hello! Ask me about the weather 😊
              </Text>
            )}

            {messages.map((msg, idx) => (
              <View
                key={`${msg.role}-${idx}`}
                style={[
                  styles.message,
                  msg.role === "user" ? styles.userMsg : styles.aiMsg,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    msg.role === "user" && styles.userText,
                  ]}
                >
                  {msg.text}
                </Text>
              </View>
            ))}

            {loading && (
              <View style={[styles.message, styles.aiMsg]}>
                <Text style={styles.typing}>Typing...</Text>
              </View>
            )}
          </ScrollView>

          {/* Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Ask about weather..."
              placeholderTextColor="#999"
              editable={!loading}
              multiline={false} // Enter will submit
              returnKeyType="send" // shows Send on keyboard
              onSubmitEditing={handleSend} // Enter to send
              blurOnSubmit={false}
              maxLength={500}
            />
            <TouchableOpacity
              style={[styles.sendBtn, loading && styles.sendBtnDisabled]}
              onPress={handleSend}
              disabled={loading}
            >
              <Text style={styles.sendText}>➤</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#1a1a2e",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: Dimensions.get("window").height * 0.85,
    minHeight: Dimensions.get("window").height * 0.6,
    flex: 0,
    flexShrink: 1,
    flexGrow: 1,
    paddingBottom: Platform.OS === "ios" ? 34 : 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  closeBtn: { padding: 8 },
  closeText: { fontSize: 24, color: "#fff" },

  messages: { flex: 1, padding: 16 },
  placeholder: {
    textAlign: "center",
    color: "#666",
    marginTop: 40,
    fontSize: 16,
  },

  message: {
    padding: 12,
    marginVertical: 4,
    borderRadius: 16,
    maxWidth: "80%",
  },
  userMsg: { alignSelf: "flex-end", backgroundColor: "#007AFF" },
  aiMsg: { alignSelf: "flex-start", backgroundColor: "#2d2d44" },

  messageText: { fontSize: 15, lineHeight: 20, color: "#e0e0e0" },
  userText: { color: "#fff" },
  typing: { fontStyle: "italic", color: "#999" },

  inputContainer: {
    flexDirection: "row",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "#333",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#2d2d44",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "ios" ? 12 : 10,
    color: "#fff",
    marginRight: 8,
  },
  sendBtn: {
    backgroundColor: "#007AFF",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  sendBtnDisabled: { backgroundColor: "#555" },
  sendText: { color: "#fff", fontSize: 20 },
});

import { GROQ_API_KEY } from "@env";

const API_KEY = GROQ_API_KEY;

export async function sendMessage(userMessage, conversationHistory = []) {
  try {
    const messages = conversationHistory.map((msg) => ({
      role: msg.role === "user" ? "user" : "assistant",
      content: msg.parts[0].text,
    }));

    messages.push({
      role: "user",
      content: userMessage,
    });

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages,
          max_tokens: 1000,
          temperature: 0.7,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "API Error");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    if (error.message?.includes("429")) {
      throw new Error("Over limit. Waiting 1 minute!");
    }
    if (error.message?.includes("rate_limit")) {
      throw new Error("Too much requests. Try again!");
    }
    throw new Error(error.message || "Error connect");
  }
}

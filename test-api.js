//import { GROQ_API_KEY } from "@env";

const API_KEY = ""; //GROQ_API_KEY

async function testGroq() {
  try {
    console.log("Testing Groq API...\n");

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "user",
              content: "Hello, test api",
            },
          ],
          max_tokens: 200,
          temperature: 0.7,
        }),
      },
    );

    const data = await response.json();

    console.log("Status:", response.status);

    if (response.ok) {
      console.log("GROQ working!\n");
      console.log("Answer:");
      console.log(data.choices[0].message.content);
      console.log("\n API key work!");
    } else {
      console.log("error:");
      console.log(JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error("Network error:", error.message);
  }
}

testGroq();

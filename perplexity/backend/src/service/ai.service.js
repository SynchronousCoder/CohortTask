import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function generateResponse(messages) {
  try {
    messages = messages.map((msg) => {
      if (msg.role === "user") {
        return {
          role: "user",
          content: msg.content,
        };
      }

      if (msg.role === "ai") {
        return {
          role: "ai",
          content: msg.content,
        };
      }
    });

    return messages; // 👈 missing
  } catch (error) {
    console.error(error);
  }
}

export async function generateChatTitle(message) {
  try {
    const response = await model.invoke(
      `Generate a relevant title for the following message in 2-5words: ${message}`,
    );
    return response.content;
  } catch (error) {
    console.error(error);
  }
}
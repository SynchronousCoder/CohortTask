import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function main() {
  try {
    const response = await model.invoke(
      "define what is ai is 100 words in most easy way"
    );

    console.log(response.content);
  } catch (error) {
    console.error(error);
  }
}
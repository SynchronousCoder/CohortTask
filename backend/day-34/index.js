import readlineSync from "readline-sync";
import dotenv from "dotenv";
import { ChatGoogle } from "@langchain/google";

dotenv.config();

const model = new ChatGoogle("gemini-3.6-flash");

// Store the complete conversation
const conversation = [];

console.log("\n╭──────────────────────────────╮");
console.log("│       ✨ PERPLEXITY AI       │");
console.log("│      Type 'exit' to quit     │");
console.log("╰──────────────────────────────╯\n");

while (true) {
  const question = readlineSync.question("😋 You  : ");

  if (question.toLowerCase() === "exit") {
    console.log("\n🤖 AI: Goodbye! 👋\n");
    break;
  }

  try {
    // Store human's question
    conversation.push(["human", question]);

    const response = await model.invoke(conversation);

    // Store AI's answer
    conversation.push(["ai", response.content]);

    console.log(`🤖 AI: ${response.content}\n`);
  } catch (error) {
    console.error("\n❌ Error:", error.message, "\n");
  }
}
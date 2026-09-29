import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, AIMessage, createAgent } from "langchain";

import { emailTool } from "../tools/index.js";

const gemini = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY,
});

const mistraAI = new ChatMistralAI({
  model: "mistral-large-latest",
  temperature: 0,
});

const agent = createAgent({
  model: gemini,
  tools: [emailTool],
});

// export async function generateResponse(messages) {
//     console.log(messages)

//     const response = await agent.invoke({
//         messages: [
//             new SystemMessage(`
//                 You are a helpful and precise assistant for answering questions.
//                 If you don't know the answer, say you don't know. 
//                 If the question requires up-to-date information, use the "searchInternet" tool to get the latest information from the internet and then answer based on the search results.
//             `),
//             ...(messages.map(msg => {
//                 if (msg.role == "user") {
//                     return new HumanMessage(msg.content)
//                 } else if (msg.role == "ai") {
//                     return new AIMessage(msg.content)
//                 }
//             })) ]
//     });

//     return response.messages[ response.messages.length - 1 ].text;

// }

export async function generateResponse(messages) {
  try {
    const formattedMessage = messages.map((msg) => {
      if (msg.role == "user") {
        return new HumanMessage(msg.content);
      } else if (msg.role == "ai") {
        return new AIMessage(msg.content);
      }
    });

    // console.log("this is formatted message = >", formattedMessage);

    const response = await agent.invoke({ messages: formattedMessage });
    const finalMessage = response.messages.at(-1);

    console.log("FINALres => ", finalMessage.content);

    return finalMessage.content;
  } catch (error) {
    throw error;
  }
}

export async function generateChatTitle(message) {
  try {
    const response = await gemini.invoke(
      `Generate a relevant title for the following message in 2-5words: ${message}`,
    );
    return response.content;
  } catch (error) {
    console.error(error);
  }
}
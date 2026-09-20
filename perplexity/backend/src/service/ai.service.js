import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY,
});

// export async function generateResponse(messages) {
//   console.log(messages);
//   try {
//     const formattedMessages = messages.map((msg) => {
//       if (msg.role == "user") {
//         return {
//           role: "user",
//           content: msg.content,
//         };
//       } else if (msg.role == "ai") {
//         return {
//           role: "ai",
//           content: msg.content,
//         };
//       }
//     });
//     const response = await model.invoke(formattedMessages);
//     return response.content;
//   } catch (error) {
//     console.error(error);
//   }
// }

export async function generateResponse(mes) {
  try {
    const formattedMessage = mes.map((msg) => {
      if (msg.role == "user") {
        return {
          role: msg.role,
          content: msg.content,
        };
      } else if (msg.role == "ai") {
        return {
          role: msg.role,
          content: msg.content,
        };
      }
    });
    console.log("this is formatted message = >", formattedMessage);

    const response = await model.invoke(formattedMessage);
    return response.content;
  } catch (error) {
    throw error;
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

import { response } from "express";
import { generateResponse, generateChatTitle } from "../service/ai.service.js";
import chatModel from "../model/chat.model.js";
import messageModel from "../model/message.model.js";

async function message(req, res) {
  const { message, chat: chatId } = req.body;

  let title, chat 

  if (!chatId) {
    title = await generateChatTitle(message);
    //   console.log("title=> ", title);
    chat = await chatModel.create({
      user: req.user.id,
      title: title,
    });
  }

  console.log(chat, chatId)

  const humanMessage = await messageModel.create({
    chat: chatId || chat._id,
    content: message,
    role: "user",
  });

  const messages = await messageModel.find({ chat: chatId || chat._id });
  console.log("messages => ", messages);

  const responseAI = await generateResponse(messages);
  //   console.log(message, responseAI);
  console.log("responseAI => ", responseAI);
  
  const aiMessage = await messageModel.create({
    chat: chatId || chat._id,
    content: responseAI,
    role: "ai",
  });

  return res.status(200).json({
    chat: chat,
    message: responseAI,
    humanMessage: humanMessage,
    aiMessage: aiMessage,
  });
}

export default { message };
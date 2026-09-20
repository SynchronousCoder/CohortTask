import { response } from "express";
import { generateResponse, generateChatTitle } from "../service/ai.service.js";
import chatModel from "../model/chat.model.js";
import messageModel from "../model/message.model.js";

async function generateMessage(req, res) {
  const { message, chat: chatId } = req.body;

  let title, chat;

  if (!chatId) {
    title = await generateChatTitle(message);
    //   console.log("title=> ", title);
    chat = await chatModel.create({
      user: req.user.id,
      title: title,
    });
  }

  console.log(chat, chatId);

  const humanMessage = await messageModel.create({
    chat: chatId || chat._id,
    content: message,
    role: "user",
  });

  //Finding all the messages in the chat to send to AI for response
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

async function generateRes(req, res) {
  const { message, chatId } = req.body;
  console.log(message, chatId);

  let title, chat;

  if (!chatId) {
    title = await generateChatTitle(message);

    chat = await chatModel.create({
      title: title,
      user: req.user.id,
    });
  }

  const humanMessage = await messageModel.create({
    chat: chatId || chat._id,
    content: message,
    role: "user",
  });

  const msgs = await messageModel.find({
    chat: chatId || chat._id,
  });

  const responseAI = await generateResponse(msgs);
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

/**
 * Fetch all the chats of particular user on the basis of who has loggined In
 */
async function chat(req, res) {
  const user = req.user;

  const chat = await chatModel.findOne({ user: user.id });

  if (!chat) {
    return res.status(404).json({
      message: "Chat not created",
    });
  }

  return res.status(200).json({
    message: "Chat fetched successfully",
    chat,
  });
}

/**
 * Fetch all the messages belongs to particular chat on basis of chatId
 */
async function message(req, res) {
  const { chatId } = req.params;

  const chat = await chatModel.findOne({
    _id: chatId,
    user: req.user.id,
  });

  if (!chat) {
    return res.status(404).json({
      message: "Chat not found",
    });
  }

  const messages = await messageModel.find({ chat: chat._id });

  return res.status(200).json({
    message: "Messages fetched successfully",
    messages,
  });
}

/**
 * Delete the whole chat on basis of chatId
 */
async function deleteChat(req, res) {
  const { chatId } = req.params;

  const chat = await chatModel.findOne({
    _id: chatId,
    user: req.user.id,
  });

  if (!chat) {
    return res.status(404).json({
      message: "Chat not found",
    });
  }

  await messageModel.deleteMany({ chat: chat._id });
  await chatModel.deleteOne({ _id: chat._id });

  return res.status(200).json({
    message: "Chat deleted successfully",
  });
}

/**
 * Delete only the particular message on basis of messageId[created by moongoose]
 */
async function deleteMessage(req, res) {
  const { messageId } = req.params;

  const messageDel = await messageModel.findByIdAndDelete({
    _id: messageId,
  });

  if (!messageId) {
    return res.status(404).json({
      message: "No such message exits",
    });
  }

  if (messageDel.role === "user") {
    await messageModel.findOneAndDelete(
      {
        chat: messageDel.chat,
        role: "ai",
        createdAt: { $gt: messageDel.createdAt },
      },
      {
        sort: { createdAt: 1 },
      },
    );
  }

  return res.status(200).json({
    message: "Message deleted successfully",
    messageDel,
  });
}

export default {
  generateMessage,
  chat,
  message,
  deleteChat,
  deleteMessage,
  generateRes,
};

import express from "express";
import controller from "../controllers/chat.controller.js";
import identifyUser from "../middleware/auth.middleware.js";

const chatRouter = express.Router();


chatRouter.post("/try", identifyUser, controller.generateRes)


/**
 * POST /api/chats
 */
chatRouter.post("/message", identifyUser, controller.generateMessage);

/**
 * 
 */
chatRouter.get("/", identifyUser, controller.chat)

/**
 * 
 */
chatRouter.get("/:chatId/message", identifyUser, controller.message)

/**
 * 
 */
chatRouter.delete("/delete/:chatId", identifyUser, controller.deleteChat)

/**
 * 
 */
chatRouter.delete("/:messageId/message", identifyUser, controller.deleteMessage)

export default chatRouter;
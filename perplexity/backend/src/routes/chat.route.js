import express from "express";
import controller from "../controllers/chat.controller.js";
import identifyUser from "../middleware/auth.middleware.js";

const chatRouter = express.Router();

chatRouter.post("/message", identifyUser, controller.message);

export default chatRouter;
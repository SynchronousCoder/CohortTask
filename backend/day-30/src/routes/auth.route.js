import express from "express";
import controller from "../controller/auth.controller.js";
import { registerValidator } from "../validators/authValidator.js";

const authRouter = express.Router();

/**
 * GET /api/auth/
 */
authRouter.get("/", controller.registerController);

/**
 * POST /api/auth/register
 */
authRouter.post("/register", registerValidator, controller.registerController);
export default authRouter;

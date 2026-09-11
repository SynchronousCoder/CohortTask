import { Router } from "express";
import controller from "../controllers/auth.controller.js";
import {registerValidator}  from "../validators/auth.validator.js";

const authRouter = Router();

/**
 * POST api/auth/register
 * Registration process of user
 */
authRouter.post("/register", registerValidator, controller.register);

/**
 * GET api/auth/verify-email
 * Verify user's email address
 */
authRouter.get("/verify-email", controller.verifyEmail);

/**
 * POST
 */
authRouter.post("/login", controller.login)

export default authRouter;
const express = require("express");
const controller = require("../controller/auth.controller");
const identifyUser = require("../middleware/auth.middleware");
const authRouter = express.Router();

/**
 * POST /api/auth/register
 * Use: User will call this api for registration process in website
 */
authRouter.post("/register", controller.registerController);

/**
 * POST /api/auth/login
 * Use: User will 
 */
authRouter.post("/login", controller.loginController);

/**
 * GET /api/auth/logout
 */
authRouter.get("/logout", identifyUser, controller.logoutController)

/**
 * 
 */
authRouter.get("/get-me", identifyUser, controller.getMeController)

module.exports = authRouter;
const express = require("express");
const controller = require("../controller/auth.controller")

const authRouter = express.Router();

/**
 * POST /api/auth/
 */
authRouter.post("/register", controller.registerController);

/**
 * POST /api/auth/
 */
 authRouter.post("/login", controller.loginController);

/**
 * GET /api/auth/
 */
authRouter.get("/get-me", controller.getMeController);

module.exports = authRouter;
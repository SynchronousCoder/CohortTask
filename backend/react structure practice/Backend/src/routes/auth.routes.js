const express = require("express");
const authRouter = express.Router();
const controller = require("../controllers/auth.controller");
const identifyUser = require("../middlewares/auth.middleware")

// prefix: /api/auth
authRouter.post("/register", controller.registerUser);
authRouter.post("/login", controller.loginUser);

//
authRouter.get("/get-me", identifyUser, controller.getMeController)
module.exports = authRouter;
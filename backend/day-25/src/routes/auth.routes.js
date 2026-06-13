const express = require("express")
const authRouter = express.Router();
const authController = require("../controllers/auth.controller")
const middleware = require("../middleware/auth.middleware")

authRouter.post("/register", authController.registerUser)
authRouter.post("/login", authController.loginUser)
authRouter.post("/get-me", middleware, authController.getMe)
authRouter.post("/logout", middleware, authController.logoutUser)


module.exports = authRouter;
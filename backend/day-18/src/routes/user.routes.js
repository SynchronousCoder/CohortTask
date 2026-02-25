const express = require("express")
const identifyUser = require("../middlewares/auth.middleware")
const controller = require("../controllers/user.controller")
const userRouter = express.Router()

//prefix: /api/user
userRouter.post("/follow/:username", identifyUser, controller.followController)

module.exports = userRouter
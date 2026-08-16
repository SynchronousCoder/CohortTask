const express = require("express")
const controller = require("../controller/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

const followRouter = express.Router()

/**
 * GET /api/users/follows/:username [protected]
 */
followRouter.get("/follow/:username", identifyUser, controller.followController)

/**
 * GET /api/users/unfollow/:username [protected]
 */
followRouter.post("/unfollow/:username", identifyUser, controller.unFollowController)

module.exports = followRouter
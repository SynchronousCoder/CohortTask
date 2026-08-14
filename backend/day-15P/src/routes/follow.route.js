const express = require("express")
const identifyUser = require("../middlewares/auth.middleware")
const controller = require("../controller/user.controller")
const followRouter = express.Router()

/**
 * GET /api/users/follow/:id
 */
followRouter.get("/follow/:id", identifyUser, controller.followUser)

/**
 * POST /api/users/unfollow/:id
 */
followRouter.post("/unfollow/:id", identifyUser, controller.unFollowUser)

module.exports = followRouter
const express = require("express")
const controller = require("../controller/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

const followRouter = express.Router()

/**
 * GET api/users/follower
 * This used to check no.of follower Exist
 */
followRouter.get("/follower", identifyUser, controller.checkFollowerController)

/**
 * GET api/users/follower
 * This used to check no.of following by loggined user
 */
followRouter.get("/following", identifyUser, controller.checkFollowingController)

/**
 * GET api/users/follower
 * This used to check no.of following by loggined user
 */
followRouter.get("/unfollowing", identifyUser, controller.checkUnFollowingController)

/**
 * GET /api/users/follow/request
 * Creating the request which checks how many following request
 *  user have recived
 */
followRouter.get("/follow/request", identifyUser, controller.checkFollowRequest)

/**
 * GET /api/users/follow/request/accept/:username
 * Accepting following request from the following username
 */
followRouter.get("/follow/request/accept/:username", identifyUser, controller.acceptFollowRequest)

/**
 * GET /api/users/follow/request/reject/:username
 * Rejecting following request from the following username
 */
followRouter.get("/follow/request/reject/:username", identifyUser, controller.rejectingFollowRequest)

/**
 * GET /api/users/follows/:username [protected]
 */
followRouter.get("/follow/:username", identifyUser, controller.followController)

/**
 * GET /api/users/unfollow/:username [protected]
 */
followRouter.post("/unfollow/:username", identifyUser, controller.unFollowController)


module.exports = followRouter
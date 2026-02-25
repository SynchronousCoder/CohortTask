const express = require("express");
const userRouter = express.Router();

const identifyUser = require("../middlewares/auth.middlewares");
const controller = require("../controllers/user.controller");

/**
 * @route GET /api/users/follow/:username
 * @description - Fetch username from url & create new record in DB -> we have already passed username in tokens
 */
userRouter.get("/follow/:username", identifyUser, controller.followUserController)

/**
 * @route POST /api/users/follow/:username
 * @description - Fetch username from url & check in DB -> apply "DeleteById" 
 */
userRouter.post("/unfollow/:username", identifyUser, controller.unFollowUserController);



module.exports = userRouter;
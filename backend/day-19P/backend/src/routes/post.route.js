const express = require("express");
const postRouter = express.Router();
const controller = require("../controller/post.controller");
const multer = require("multer");
const identifyUser = require("../middlewares/auth.middleware");
const upload = multer({ storage: multer.memoryStorage() });

/**
 * POST /api/posts/
 */
postRouter.post("/", upload.single("image"), identifyUser,controller.createPostController);

/**
 * GET /api/posts/ [protected]
 * This will fetch the post of the login user
 */
postRouter.get("/", identifyUser,controller.fetchPostController);

/**
 * GET /api/posts/details/:postid
 * - return detail about specific post with the id. also check whether the post
belongs to the user that the request come from 
 */
postRouter.get("/details/:postId", identifyUser,controller.getPostDetailsController);

/**
 * GET /api/posts/like/postId
 */
postRouter.get("/like/:postId", identifyUser, controller.likePostController)

/**
 * GET /api/posts/unlike/postId
 */
postRouter.get("/unlike/:postId", identifyUser, controller.unLikePostController)

/**
 * GET /api/posts/feed [protected]
 * user can only watch post if loggined
 */
postRouter.get("/feed", identifyUser, controller.getAllPostController)

module.exports = postRouter;
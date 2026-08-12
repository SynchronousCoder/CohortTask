const express = require("express");
const postRouter = express.Router();
const controller = require("../controller/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
/**
 * POST /api/posts/
 */
postRouter.post("/", upload.single("image"), controller.createPostController);

/**
 * GET /api/posts/ [protected]
 * This will fetch the post of the login user
 */
postRouter.get("/", controller.fetchPostController);

/**
 * GET /api/posts/details/:postid
 * - return detail about specific post with the id. also check whether the post
belongs to the user that the request come from 
 */
postRouter.get("/details/:postId", controller.getPostDetails);
module.exports = postRouter;

//process of doing work required models to create post multer thing to acces form data file
const express = require("express");
const postRouter = express.Router();
const controller = require("../controllers/post.controller");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middlewares/auth.middlewares")

//prefix: /api/post/
postRouter.post("/", upload.single("image"), identifyUser, controller.createPostController);

/**
 * GET /api/post/ [protected]
 */
postRouter.get("/", identifyUser, controller.getPostController)

/**
 * GET /api/post/details/:postid
 * - return an detail about specific post with the id. also check whether the post belongs to the user that the request come from
 */
postRouter.get("/details/:postId", identifyUser, controller.getPostDetailsController);

module.exports = postRouter;
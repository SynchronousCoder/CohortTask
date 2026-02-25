const express = require("express")
const postRouter = express.Router()
const identifyUser = require("../middlewares/auth.middleware")
const controller = require("../controllers/post.controller")

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

//prefix: /api/post
//creating the post and storing it through imageKit
postRouter.post("/", identifyUser, upload.single("chacha"), controller.uploadPostController)

//fetching out and seeing all the post
postRouter.get("/", identifyUser, controller.getAllPost)

module.exports = postRouter;
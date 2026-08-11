const express = require("express")
const postRouter = express.Router()
const controller = require("../controller/post.controller")
const multer  = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
/**
 * POST /api/posts/
 */
postRouter.post("/", upload.single('image'), controller.createPost)

module.exports = postRouter
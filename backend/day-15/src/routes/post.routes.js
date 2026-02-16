const express = require("express");
const postRouter = express.Router();
const controller = require("../controllers/post.controller");

//to read + store the image file
const multer = require("multer");
const upload = multer({storage: multer.memoryStorage() });

postRouter.post("/", upload.single("chacha"), controller.createPostController)

module.exports = postRouter;
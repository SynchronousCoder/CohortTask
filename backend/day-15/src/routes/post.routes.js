const express = require("express");
const postRouter = express.Router();
const controller = require("../controllers/post.controller");

//to read + store the image file
const multer = require("multer");
const upload = multer({storage: multer.memoryStorage() });

postRouter.post("/", upload.single("img"), controller.createPostController)

module.exports = postRouter;
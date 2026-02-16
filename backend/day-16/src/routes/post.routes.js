//process of doing work required models to create post multer thing to acces form data file
const express = require("express");
const postRouter = express.Router();
const controller = require("../controllers/post.controller");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

//prefix: /api/post/
postRouter.post("/", upload.single("image"), controller.createPost);

module.exports = postRouter;
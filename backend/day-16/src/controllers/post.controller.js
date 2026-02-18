const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

//Creating the post
async function createPostController(req, res) {
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "cohort-2-insta-clone-posts",
  });
  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.user,
  });

  res.status(201).json({
    message: "Post created succesfully",
    file,
    post,
  });
}

//Fetching the post
async function getPostController(req, res) {
  const userId = req.user.user;
  //why user : userId likha ? =
  const posts = await postModel.find({ user: userId });

  if (!posts) {
    return res.status(404).json({
      message: "Posts not Found - 404",
    });
  }

  return res.status(200).json({
    message: "Posts fetched successfully",
    posts,
  });
}

//Finding details by verifying
async function getPostDetailsController(req, res) {
  const userId = req.user.user; //already a string
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found - 404",
    });
  }
  //why? post.user =
  const isVerifyingUser = post.user.toString() === userId;

  if (!isVerifyingUser) {
    return res.status(403).json({
      message: "Forbidden content",
    });
  }

  return res.status(200).json({
    message: "Post details fetched successfully",
    post,
  });
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
};

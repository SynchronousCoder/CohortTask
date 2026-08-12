const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const userModel = require("../models/user.model");
const postModel = require("../models/post.model");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

/**
 * Creating the post
 */
async function createPostController(req, res) {
  const token = req.cookies.token;

  if (!token) {
    res.status(409).json({
      message: "Please login again, token expired",
    });
  }

  let decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userModel.findById(decoded.id);

  console.log(req.body.caption, req.file, token, decoded.id, user);

  const img = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "insta_Clone",
  });

  console.log("IMAGE: ", img.url);

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: img.url,
    user: user._id,
  });

  res.status(201).json({
    message: "Post created succesfully",
    post,
  });
}

/**
 * Fetching all post (of the particular user only)
 */
async function fetchPostController(req, res) {
  const token = req.cookies.token;
  if (!token) {
    res.status(404).json({
      message: "Token not found",
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    res.status(409).json({
      message: "Unauthorized User",
    });
  }
  let userId = decoded.id;

  const post = await postModel.find({ user: userId });
  console.log(`All the post by ${decoded.username}`, post);
}

/**
 * Fetching the particular post if user created that
 */
async function getPostDetailsController(req, res) {
  const token = req.cookies.token;
  if (!token) {
    res.status(409).json({
      message: "Unauthorized User",
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    res.status(409).json({
      message: "Unauthorized Token Can't fetch the post",
      error,
    });
  }

  const postId = req.params.postId;
  const userId = decoded.id;

  // console.log(decoded);

  const post = await postModel.findById(postId);
  if (!post) {
    res.status(404).json({
      message: "Post not found",
    });
  }
  // console.log(post.user.toString(), userId)

  const isValidUser = post.user.toString() === userId;
  // console.log(isValidUser)
  if (!isValidUser) {
    res.status(403).json({
      message: "Forbidden Content",
    });
  }

  return res.status(200).json({
    message: "Post Fetched Successfully",
    post,
  });
}

module.exports = {
  createPostController,
  fetchPostController,
  getPostDetailsController,
};

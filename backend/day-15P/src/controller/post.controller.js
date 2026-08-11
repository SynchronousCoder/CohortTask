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

async function createPost(req, res) {
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
    user: user._id
  });

  res.status(201).json({
    message: "Post created succesfully",
    post,
  });
}

module.exports = {
  createPost,
};
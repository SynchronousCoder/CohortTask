const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const mongoose = require("mongoose")

//Uploading post while using ImageKit
async function uploadPostController(req, res) {
  const { caption, imgUrl } = req.body;
  console.log(caption, req.file);

  const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  });

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "fileName",
    folder: "practiceBringPerfection"
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id
  })

  return res.status(201).json({
    message: "Post is created successfully",
    post
  })
}

//Fetching out all the post of the users
async function getAllPost(req, res) {
  const userId = req.user.id
  const post = await postModel.find({
    user: userId                     //bcz while creating the post we are sending user: userId
  })

  if(!post){
    return res.status(404).json({
      message: "User not created any post"
    })
  }

  res.status(200).json({
    message: "Post fetch successfully",
    post
  })
}

//Fetching the particular post data on basis of Id
async function getPostDetailsController(req, res) {
  const userId = req.user.id
  const postId = req.params.postId

  // ✅ ID validation pehle
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({
      message: "Invalid post ID"
    });
  }

  const post = await postModel.findOne({
    _id: postId,
    user: userId
  })
  if(!post){
    return res.stauts(404).json({
      message: "User haven't created any post"
    })
  }

  return res.status(200).json({
    message: "Post Accessed Succesfully",
    post
  })
}

async function getFeedController(req, res){
  const posts = await postModel.find().populate("user")

  return res.status(200).json({
    message: "Posts fetched successfully",
    posts
  })
}

module.exports = {
  uploadPostController,
  getAllPost,
  getPostDetailsController,
  getFeedController
};

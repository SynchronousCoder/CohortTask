const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const userModel = require("../models/user.model");
const postModel = require("../models/post.model");
const likeModel = require("../models/like.model");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

/**
 * Creating the post
 */
async function createPostController(req, res) {
  console.log(req.body.caption, req.file, req.user.id);

  const img = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "insta_Clone",
  });

  console.log("IMAGE: ", img.url);

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: img.url,
    user: req.user.id,
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
  let userId = req.user.id;

  const post = await postModel.find({ user: userId });
  console.log(`All the post by ${req.user.username}`, post);
}

/**
 * Fetching the particular post if user created that
 */
async function getPostDetailsController(req, res) {
  const postId = req.params.postId;
  const userId = req.user.id;

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
// async function getPostDetailsController(req, res) {
//   const token = req.cookies.token
//   let decoded
//   try {
//     decoded = jwt.verify(token, process.env.JWT_SECRET)
//   } catch (error) {
//     res.status(409).json({
//       message: "Unauthorized User",
//       error
//     })
//   }
//   console.log(decoded)

//   const userId = decoded.id
//   const postId = req.params.postId

//   const post = await postModel.findById(postId)
//   console.log(post.user)

//   const verifyPostUser = post.user.toString() === userId

//   if(!verifyPostUser){
//     res.status(409).json({
//       message: "Unauthroized user, You can't view this post"
//     })
//   }

//   res.status(200).json({
//     message: "Post fetched successfully",
//     post
//   })
// }

/**
 * Liking a post by /postId
 */
async function likePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId; //recieve id here

  const isPostExist = await postModel.findById(postId);

  if (!isPostExist) {
    return res.status(404).json({
      message: "Not such post is found",
    });
  }

  const alreadyLikedPost = await likeModel.findOne({
    post: postId,
    user: username,
  });

  if (alreadyLikedPost) {
    return res.status(200).json({
      message: "Post is already liked",
    });
  }

  const like = await likeModel.create({
    post: postId,
    user: username,
  });

  res.status(200).json({
    message: `Post liked successfully`,
    like
  });
}

/**
 * UNLiking a post by /postId
 */
async function unLikePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId; //recieve id here

  const isPostExist = await postModel.findById(postId);

  if (!isPostExist) {
    return res.status(404).json({
      message: "Not such post is found",
    });
  }

  const isPostLiked = await likeModel.findOne({
    post: postId,
    user: username,
  });

  if (!isPostLiked) {
    return res.status(400).json({
      message: "Post didn't liked by user",
    });
  } 

  await likeModel.findByIdAndDelete(isPostLiked._id)

  res.status(200).json({
    message: `Post unliked successfully`
  });
}

/**
 * Fetching all post
 */
async function getAllPostController(req, res) {
  const posts = await Promise.all(
    (await postModel.find({}).sort({_id: -1}).populate("user").lean()).map(async (post) => {
      const isLiked = await likeModel.findOne({
        post: post._id,
        user: req.user.username,
      });

      post.isLiked = Boolean(isLiked);
      return post;
    }),
  );

  res.status(200).json({
    message: "All post fetched successfully",
    posts,
  });
}

module.exports = {
  createPostController,
  fetchPostController,
  getPostDetailsController,
  likePostController,
  unLikePostController,
  getAllPostController,
};

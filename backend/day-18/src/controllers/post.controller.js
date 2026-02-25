const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
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
async function getAllPost(req, res) {
  const userId = req.user.id
  const post = await postModel.find({
    user: userId
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

async function getPostDetailsController(req, res) {
  const userId = req.user.id
}

module.exports = {
  uploadPostController,
  getAllPost
};

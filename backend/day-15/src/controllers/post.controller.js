const postModel = require("../models/post.models");

async function createPostController(req, res) {
    console.log(req.body, req.file)
}

module.exports = {
    createPostController,
}
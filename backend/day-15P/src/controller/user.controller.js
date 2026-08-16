const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

async function followController(req, res) {
  const follower = req.user.username;
  const followee = req.params.username;

  if (follower === followee) {
    res.status(400).json({
      message: "You can't follow yourself",
    });
  }

  const isUserExist = await userModel.findOne({
    username: followee,
  });

  if (!isUserExist) {
    return res.status(404).json({
      message: "User you want follow Doesn't Found",
    });
  }
  console.log("USER => ", isUserExist);
  const follow = await followModel.create({
    follower: follower,
    followee: followee,
  });

  res.status(200).json({
    message: `Following ${followee} user Successfully`,
    follow,
  });
}

async function unFollowController(req, res) {
  const follower = req.user.username;
  const followee = req.params.username;

  const isUserExist = await userModel.findOne({
    username: followee,
  });

  if (!isUserExist) {
    return res.status(404).json({
      message: "User you want follow Doesn't Found",
    });
  }

  const unFollow = await followModel.findOneAndDelete({
    follower: follower,
    followee: followee
  });
  
  res.status(200).json({
    message: `You unfollowed ${followee} user`,
  });
}

module.exports = {
  followController,
  unFollowController
};

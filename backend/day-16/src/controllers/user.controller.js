const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");


//Following someUser, by passing out the userName => type: String simply
async function followUserController(req, res){
  const followerUsername = req.user.username  ;    //kon follow kar raha hai, already passed username while registration/login
  const followeeUsername = req.params.username;    //kon follow ho raha haii

  //check1: user aapne aap ko follow na kare:
  if(followerUsername == followeeUsername){
    return res.status(409).json({
      message: "You can't follow yourself"
    })
  }

  //check2: jisko follow karna hai it exist or not?
  const isUserExist = await userModel.findOne({
    username: followeeUsername
  });
  if(!isUserExist){
    return res.status(404).json({
      message: "User not found / User doesn't Exist - 4O4"
    })
  }

  //check3: ek user 2 baar kyu follow ho raha hai?
  const isUserFollowedAlready = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername
  })
  if(isUserFollowedAlready){
    return res.status(409).json({
      message: "You have already followed the User"
    })
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername
  })
  res.status(201).json({
    message: `You are now following ${followeeUsername}`,
    follow: followRecord
  })

}


//Creating the unfollowing Feature 
async function unFollowUserController(req, res) {
  const followerUsername = req.user.username
  const followeeUsername = req.params.username

  //Finding specific data and deleting it from DB
  const isFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername
  })

  if(!isFollowing){
    return res.status(409).json({
      message: `You aren't following ${followeeUsername}`
    })
  }

  await followModel.findByIdAndDelete(isFollowing._id)

  res.status(200).json({
     message: `You have unfollowed ${followeeUsername}`
  })
}


module.exports = {
    followUserController,
    unFollowUserController
}
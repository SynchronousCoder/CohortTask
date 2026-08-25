const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

/**
 * FOLLOW FEATURE
 */
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

/**
 * UNFOLLOW FEATURE
 */
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
    followee: followee,
  });

  res.status(200).json({
    message: `You unfollowed ${followee} user`,
  });
}

/**
 * CHECK THE FOLLOWER COUNT
 */
async function checkFollowerController(req, res) {
    const followeeUsername = req.user.username

    const followers = await followModel.find({
        followee: followeeUsername,
        status: "accepted"
    })

    if(!followers){
        return res.status(404).json({
            message: "No follower exist till now"
        })
    }

    return res.status(200).json({
        message: "Follower list fetched successfuly",
        followers
    })
}

/**
 * CHECK THE FOLLOWING COUNT
 */
async function checkFollowingController(req, res) {
    const followerUsername = req.user.username

    const following = await followModel.find({
        follower: followerUsername,
    })

    if(!following){
        return res.status(404).json({
            message: "No following exist till now, Follow someone"
        })
    }

    return res.status(200).json({
        message: "Follower list fetched successfuly",
        following
    })
}

/**
 * 
 */
async function checkUnFollowingController(req, res) {
  const username = req.user.username
  
  //people i follow
  const following = await followModel.find({
    follower: username
  })

  //people following me
  const followers = await followModel.find({
    followee: username
  })
  
  // Extract usernames
  const followingUsername = following.map(
    (follow) => follow.followee
  )

  const followerUsername = followers.map(
    (followers) => followers.follower
  )
  
  const connectedUsers = [
    ...new Set([
      ...followingUsername,
      ...followerUsername,
    ])
  ]

    console.log("CURRENT USER:", username);
    console.log("FOLLOWING:", followingUsername);
    console.log("FOLLOWERS:", followerUsername);
    console.log("CONNECTED:", connectedUsers);

    // People with whom there is no follow relationship
    const unfollowing = await userModel.find({
        username: {
            $nin: [
                username,
                ...connectedUsers
            ]
        }
    });


  return res.status(200).json({
    message: "Data fetched Successfully",
    unfollowing
  })
}

/**
 * CHECK THE REQUEST OF FOLLOWING
 */
async function checkFollowRequest(req, res) {
  const followeeUsername = req.user.username;

  const request = await followModel.findOne({
    followee: followeeUsername,
    status: "pending",
  });
  console.log(request);

  if (!request) {
    return res.status(404).json({
      message: "Not following request found",
    });
  }

  res.status(200).json({
    message: "Following request recived successfully",
    request,
  });
}

/**
 * Logic for accepting the user request
 */
async function acceptFollowRequest(req, res) {
  const followerUsername = req.params.username;
  const followeeUsername = req.user.username;

  const isFollowerExist = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!isFollowerExist) {
    return res.status(404).json({
      message: "No following user exist",
      followerUsername,
      followeeUsername,
    });
  }

  const acceptRequest = await followModel.findOneAndUpdate(
    {
      follower: followerUsername,
      followee: followeeUsername,
      status: "pending",
    },
    {
      status: "accepted",
    },
    {
      new: true,
    },
  );

  console.log(followerUsername, followeeUsername, acceptRequest);

  return res.status(200).json({
    message: `Following request from ${followerUsername} is accepted successfully`,
  });
}

/**
 * Logic for rejecting the user request
 */
async function rejectingFollowRequest(req, res) {
  const followerUsername = req.params.username;
  const followeeUsername = req.user.username;

  const isFollowerExist = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
    status: "pending",
  });

  if (!isFollowerExist) {
    return res.status(404).json({
      message: "No following user exist",
      followerUsername,
      followeeUsername,
    });
  }

  const rejectRequest = await followModel.findOneAndUpdate(
    {
      follower: followerUsername,
      followee: followeeUsername,
      status: "pending",
    },
    {
      status: "rejected",
    },
  );

  return res.status(200).json({
    message: `You have rejected the follwoing request from ${followerUsername} user`
  })
}

module.exports = {
  followController,
  unFollowController,
  checkFollowerController,
  checkFollowingController,
  checkUnFollowingController,
  checkFollowRequest,
  acceptFollowRequest,
  rejectingFollowRequest
};

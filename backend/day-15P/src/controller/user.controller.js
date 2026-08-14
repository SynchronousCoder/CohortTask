const followModel = require("../models/follow.model")

/**
 * Following Feature
 */
async function followUser(req, res) {
    const follower = req.user.id
    const followee = req.params.id

    if(followee === follower){
        res.status(400).json({
            message: "You can't follow yourself"
        })
    }

    const follow = await followModel.create({
        follower: follower,
        followee: followee
    })

    res.status(200).json({
        message: "Followed succesfully",
        follow
    })
}

/**
 * 
 */
async function unFollowUser(req, res) {
    const follower = req.user.id
    const followee = req.params.id

    const follow = await followModel.findOneAndDelete({
        follower: follower,
        followee: followee
    })

    if(!follow){
        res.status(404).json({
            message: "No user found to unfollow"
        })
    }

    res.status(200).json({
        message: "Unfollowed Successfully"
    })
}

module.exports = {
    followUser,
    unFollowUser
}
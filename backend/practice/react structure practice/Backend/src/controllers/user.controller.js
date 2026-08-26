const followModel = require("../models/follow.model")

async function followController(req, res) {
    const follower= req.user.username;    //who is following
    const followee= req.params.username;  //who is getting followers

    if(follower == followee){
        return res.status(400).json({
            message: "You can't follow yourself"
        })
    }

    const isFollowExist = await followModel.findOne({
        follower: follower,
        followee: followee
    }) 
    if(isFollowExist){
        return res.status(400).json({
            message: "You already following the user"
        })
    }
    const followRecord = await followModel.create({
        follower: follower,
        followee: followee
    })

    return res.status(201).json({
        message: `You have followed ${followee} successfully`,
        follow: followRecord
    })
}

module.exports = {
    followController
}
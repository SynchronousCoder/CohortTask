const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "Follower is required"]
    },
    followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "Followee is required"]
    }
},{
    timestamps: true
})

followSchema.index({ follower: 1, following: 1 }, { unique: true });

const followModel = mongoose.model("follows", followSchema)

module.exports = followModel
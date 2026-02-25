const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: String,
      ref: "users",
      required: [true, "Follower is required"],
    },
    followee: {
      type: String,
      ref: "users",
      required: [true, "Followee is required"],
    },
  },
  {
    timestamps: true,
  },
);

const followModel = mongoose.model("follow", followSchema);

module.exports = followModel;
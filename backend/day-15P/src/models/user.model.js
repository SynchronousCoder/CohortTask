const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username already exists"],
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  bio: String,
  profilePic: {
    type: String,
    default:
      "https://ik.imagekit.io/aren/insta_Clone/Test_gVGl0tzKN?updatedAt=1770960631026",
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
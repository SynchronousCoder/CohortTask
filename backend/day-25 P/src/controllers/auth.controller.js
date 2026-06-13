const userModel = require("../models/auth.model");
const blacklistModel = require("../models/blacklist.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  const userAlreadyExists = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (userAlreadyExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // Set token in cookie
  res.cookie("token", token);
  res.status(201).json({
    message: "User registered successfully",
    id: user._id,
    username: user.username,
    email: user.email,
    token,
  });
}

async function loginUser(req, res) {
  const { username, email, password } = req.body;

  //Username || Email
  const user = await userModel.findOne({
    $or: [{ email }, { username }],
  });
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  //Checking Password...
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }

  //Setting Token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // Set token in cookie
  res.cookie("token", token);


  res.status(200).json({
    message: "User logged-in successfully",
    id: user._id,
    username: user.username,
    email: user.email,
    token,
  });
}

async function getMe(req, res){
    const user = await userModel.findById(req.user.id);
    res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email,
    })
}
async function LogoutUser(req, res) {
  const user = await userModel.findById(req.user.id);

  const token = req.cookies.token;

  try {
    await blacklistModel.create({ token });
    res.clearCookie("token");
    return res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error logging out user",
      error: err.message,
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  LogoutUser,
};

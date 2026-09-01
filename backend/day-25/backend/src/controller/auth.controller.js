const userModel = require("../models/auth.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const redis = require("../config/cache");

/**
 * Used in registration process of user
 */
async function registerController(req, res) {
  const { username, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  //   console.log("=>>>", isUserAlreadyExist)

  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: `${isUserAlreadyExist.email == email ? "Email" : "Username"} already exist`,
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username: username,
    email: email,
    password: hash,
  });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "3d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "New user registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    token,
  });
}

/**
 * Used in login process of user
 */
async function loginController(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({ $or: [{ username }, { email }] }).select("+password")

  if (!user) {
    return res.status(404).json({
      message: "User doesn't exist, Pls register",
    });
  }

  const verifyPassword = await bcrypt.compare(password, user.password);

  if (!verifyPassword) {
    return res.status(400).json({
      message: "Password is incorrect",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "3d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User Loggined Successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    token,
  });
}

/**
 * Used in logout process of user
 */
async function logoutController(req, res) {
  const token = req.cookies.token;

  const blackListToken = await redis.set(
    token,
    Date.now().toString(),
    "EX",
    60 * 60,
  );

  res.clearCookie("token");

  res.status(200).json({
    message: "Logout Successfully",
    blackListToken,
  });
}

/**
 *
 */
async function getMeController(req, res) {
  const user = await userModel.findById(req.user.id)

   res.status(200).json({
    message: "User fetched successfully",
    user
   })
}

module.exports = {
  registerController,
  loginController,
  logoutController,
  getMeController,
};

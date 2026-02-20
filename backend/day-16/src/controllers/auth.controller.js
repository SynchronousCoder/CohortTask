const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res){
  const { username, email, password } = req.body;

  const userAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (userAlreadyExist) {
    return res.status(401).json({
      message:
        "User Already exist " +
        (userAlreadyExist.email == email
          ? "Email already exist"
          : "Username already exist"),
    });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await userModel.create({ username, email, password: hash });

  const token = jwt.sign(
    {
      user: user._id,
      user: user.username
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "New user registered",
    user,
    token
  });
}

async function loginUser(req, res){
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(404).json({
      message: "The user not found",
    });
  }

  const hash = await bcrypt.compare(password, user.password);
  if (!hash) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    {
      user: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

module.exports = {
    registerUser,
    loginUser
}
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const crypt = require("crypto");

async function registeringProcess(req, res) {
  const { username, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    return res.status(401).json({
      message: "User with the same username or email already exists",
    });
  }

  const hash = crypt.createHash("sha256").update(password).digest("hex");

  const user = await userModel.create({ username, email, password: hash });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered succesfully",
    user,
    token,
  });
}

async function loginProcess(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const hash = crypt.createHash("sha256").update(password).digest("hex");

  const isPasswordCorrect = hash == user.password;

  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: "Incorrect password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User loggined succesfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

module.exports = {
    registeringProcess,
    loginProcess
}
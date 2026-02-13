const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");

async function registeringProcess(req, res) {
  const { username, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    return res.status(401).json({
      message:
        "User already Exist" +
        (isUserAlreadyExist.email == email
          ? ", Email already exists"
          : ", Username already exists"),
    });
  }

  //replacing crypto with bcrypt
  const hash = await bcrypt.hash(password, 10);

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

  //CAN login with = email or username + password is mandotary
  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  //by using of bcryptjs, we are comparing + checking password
  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
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
  loginProcess,
};

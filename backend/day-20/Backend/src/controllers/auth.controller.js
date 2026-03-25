const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/auth.model");

//Registering the user
async function registerUser(req, res) {
  const { username, email, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    return res.status(401).json({
      message:
        "User already exist" +
        (isUserAlreadyExist.email == email
          ? "Email is used"
          : "Username is used"),
    });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = await userModel.create({ username, email, password: hash });

  const token = jwt.sign(
    {
      id: user._id,
      user: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "New user registered successfully",
    user,
    token,
  });
}

//Login the user
async function loginUser(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  }).select("+password");

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const hash = await bcrypt.compare(password, user.password);

  if (!hash) {
    return res.status(401).json({
      message: "Unauthrozied User",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User loggined successfully",
    user,
    token,
  });
}

//Get the details of Logined User
async function getMeController(req, res){
  const id = req.user.id

  const user = await userModel.findById(id)

  res.status(200).json({
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio
    }
  })
}


module.exports = {
  registerUser,
  loginUser,
  getMeController,
};

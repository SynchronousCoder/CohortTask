const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const authRouter = express.Router();

// /api/auth
authRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const userAlreadyExist = await userModel.findOne({
    $or: [{ email }, { username }],
  });
  if (userAlreadyExist) {
    res.status(409).json({
      message: "Email or username already exists",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user,
    token,
  });
});

// /api/auth
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    res.status(404).json({ message: "Please register, Email not found" });
  } else {
    console.log(user);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    res.status(401).json({
      message: "Password incorrect",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token);

  res.status(200).json({
    message: "User loggined successfully",
    user,
    token,
  });
});

// /api/auth
authRouter.get("/get-me", async (req, res) => {
    const token = req.cookies.token
    console.log(token)
    if(!token){
        res.status(404).json({
            message: "Please Login Again"
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded.id)

    const user = await userModel.findById(decoded.id)

    if(!user){
        res.status(404).json({
            message: "User not found"
        })
    }

    res.status(200).json({
        message: "User data fetched successfully",
        user
    })
})

module.exports = authRouter;
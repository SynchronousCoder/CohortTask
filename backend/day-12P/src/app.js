const express = require("express");
const userModel = require("./model/user.model");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  const user = await userModel.create({
    username: username,
    email: email,
    password: password,
  });

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    user,
    token
  });
});

module.exports = app;
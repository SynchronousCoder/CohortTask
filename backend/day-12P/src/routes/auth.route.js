const express = require("express");
const authRouter = express.Router();
const userModel = require("./../model/user.model");
const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req, res) => {
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
    token,
  });
});

authRouter.post("/protected", async (req, res) => {
  console.log(req.cookies)

  res.status(200).json({
    message: "Token succesfully fetched"
  })
})

authRouter.post("/login", async (req, res) => {
  const {email, password} = req.body

  const user = await userModel.findOne({email})
  if(!user){
    res.status(409).json({
      message: "User Doesn't Exist"
    })
  }

  if(user.password != password){
    res.status(409).json({
      message: "Password is Incorrect"
    })
  }

  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"})
  res.cookie("token", token)

  res.status(200).json({
    message: "User Logged In Successfully",
    user,
    token
  })
})

authRouter.get("/get-me", async (req, res) => {
  let decoded
  const token = req.cookies.token

  if(!token){
    res.status(404).json({
      message: "Please Login or Register"
    })
  }

  try{
      decoded = jwt.verify(token, process.env.JWT_SECRET)
      console.log(decoded)

      // res.status(200).json({
      //   message: "User Verified",
      //   user: decoded
      // })
  }catch(err){
    res.status(401).json({
      error: "Invalid or expired token"
    })
  }

  const user = await userModel.findById(decoded.id)
  console.log(user)
  res.status(200).json({
    message: "User detailed successfully",
    email: user.email,
    username: user.username
  })

})
module.exports = authRouter;
const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

//command is important bcz without this we can only create API's in "app.js"
const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {

    const {name, email, password} = req.body;

    //Giving proper response for using email id again
    const emailAlreadyExist = await userModel.findOne({email});
    if(emailAlreadyExist){
        res.status(400).json({
            message: "Account already exists with this email"
        })
    }

    const user = await userModel.create({name, email, password});

    //Server digital signature done by using JWT_SECRET key
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET
    )

    //Storing the token in cookie storage of browser
    res.cookie("jwtToken", token)

    res.status(201).json({
        message: "User registered successfully",
        user,
        token
    })
})

module.exports = authRouter;
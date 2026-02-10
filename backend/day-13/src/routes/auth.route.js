const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const authRoute = express.Router();

//register route
authRoute.post("/register", async (req, res) => {
    const {name, email, password} = req.body;

    const existingUser = await userModel.findOne({email});
    if(existingUser){
        res.status(400).json({
            message : "Email is already used"
        })
    }

    //securring password using hashing
    const hashPass = crypto.createHash("md5").update(password).digest("hex");

    const user = await userModel.create({name, email, password: hashPass});

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwtToken", token);

    res.status(201).json({
        message: "User registered successfully",
        user,
        token
    })
})

//login route [Here callback or fat arrow fxn also called as "controller"]
authRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const userLogin = await userModel.findOne({email});

    if(!userLogin){
        res.status(404).json({
            message: "User Not Found with this email - 404"
        })
    }

    //using hashing to match the password
    const isPasswordMatched = userLogin.password === crypto.createHash("md5").update(password).digest("hex");

    if(!isPasswordMatched){
        res.status(401).json({
            message: "Invalid Password"
        })
    }

    const token = jwt.sign(
        {
            id: userLogin._id,
        }, 
    process.env.JWT_SECRET)

    res.cookie("jwtToken", token);

    res.status(200).json({
        message: "User Loggined Succesfully",
        token
    })

})


module.exports = authRoute;
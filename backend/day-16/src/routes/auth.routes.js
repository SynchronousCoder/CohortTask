    const express = require("express");
    const authRouter = express.Router();
    const controller = require("../controllers/auth.controller");

    //prefix: /api/auth
    authRouter.post("/register", controller.registerUser);
    authRouter.post("/login", controller.loginUser);


    module.exports = authRouter;
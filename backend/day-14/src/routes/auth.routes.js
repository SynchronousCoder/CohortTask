const express = require("express");
const controller = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/register", controller.registeringProcess);

authRouter.post("/login", controller.loginProcess);


module.exports = authRouter;
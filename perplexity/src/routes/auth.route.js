import { Router } from "express";
import controller from "../controllers/auth.controller.js";
import {registerValidator}  from "../validators/auth.validator.js";

const authRouter = Router();

authRouter.post("/register", registerValidator, controller.register);

export default authRouter;
import { validationResult } from "express-validator";

async function basicController(req, res, next) {
  // throw new Error("encounter error while registering user")
  if (user) {
    const error = new Error("user not found");
    error.statusCode = 404;
    return next(error);
  }
}

async function registerController(req, res, next) {
  const { email, password } = req.body;

  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array(),
    });
  }
  res.status(200).json({
    message: "User registered successfully",
    email,
    password,
  });
}

export default { basicController, registerController };

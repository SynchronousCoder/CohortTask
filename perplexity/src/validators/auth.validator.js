import { body, validationResult } from "express-validator";

function validate(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }

  next();
}

export const registerValidator  = [
  body("username")
    .notEmpty()
    .withMessage("Username is required.")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long."),

  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address."),

  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 6 characters long."),

  validate,
];
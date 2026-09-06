import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  res.status(400).json({
    errors: errors.array(),
  });
};
export const registerValidator = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password")
    .custom((value) => {
      // Regex: at least 1 uppercase, 1 lowercase, 1 special char, min 6 length
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;

      if (!regex.test(value)) {
        throw new Error(
          "Password must contain at least 1 uppercase, 1 lowercase, 1 special character and be 6+ characters long",
        );
      }

      return true;
    })
    .withMessage(
      "Password must contain at least 1 uppercase, 1 lowercase, 1 special character and be 6+ characters long",
    ),

  validate,
];

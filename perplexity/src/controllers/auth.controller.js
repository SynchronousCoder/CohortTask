import userModel from "../model/user.model.js";
import { sendEmail } from "../service/mail.service.js";

async function register(req, res) {
  const { username, email, password } = req.body;

  const userAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (userAlreadyExists) {
    return res.status(400).json({
      message: `${userAlreadyExists.email === email ? "Email" : "Username"} already exists`,
    });
  }

  const user = await userModel.create({
    username,
    email,
    password,
  });

  await sendEmail({
    to: email,
    subject: "Welcome to Perplexity",
    text: `Hi ${username},

Welcome to Perplexity! 🎉

Your account has been successfully created and you're ready to start exploring, asking questions, and discovering insights powered by AI.

We're excited to have you on board.

If you did not create this account, please ignore this email or contact support immediately.

Happy exploring!

Best regards,
The Perplexity Team`,
  });

  res.status(201).json({
    message: "user created successfully",
    user,
  });
}

export default { register };
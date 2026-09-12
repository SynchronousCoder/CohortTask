import userModel from "../model/user.model.js";
import { sendEmail } from "../service/mail.service.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

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

  const emailVerificationToken = await jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET,
  );

  await sendEmail({
    to: email,
    subject: "Welcome to Perplexity!",
    html: `
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
                <p>Please verify your email address by clicking the link below:</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br>The Perplexity Team</p>
        `,
  });

  return res.status(201).json({
    message: "user created successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      verified: user.verified,
    },
  });
}

async function verifyEmail(req, res) {
  const { token } = req.query;

  try {
    console.log("token=>", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ email: decoded.email });

    console.log("ok", user);
    if (!user) {
      return res.status(404).json({
        message: "User not found, pls verify your account",
      });
    }

    /**
     * Writing Logic for user can verify only once, if click on same screen will see something else
     */
    let html = null;

    if (user.verified) {
      html = `
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
      <h1 style="color: #22c55e;">✅ Email Already Verified</h1>
      <p style="font-size: 16px; color: #555;">
        Your email address has already been successfully verified.
      </p>
      <p style="font-size: 16px; color: #555;">
        You can now log in to your account and continue using our services.
      </p>
    </div>
  `;
    } else {
      user.verified = true;
      await user.save();
      html = `
  <div style="max-width:600px;margin:50px auto;padding:40px;background:#111827;border-radius:16px;font-family:Arial,sans-serif;text-align:center;border:1px solid #374151;">
  
     <h1 style="color:#22c55e;margin-bottom:20px;">
         ✅ Email Verified Successfully!
     </h1>
  
     <p style="font-size:16px;color:#d1d5db;line-height:1.6;margin:25px 0;">
         Your email has been verified successfully. You can now access your account.
     </p>
  
     <a
         href="http://${process.env.URL}/api/auth/login"
         style="
             display:inline-block;
             padding:14px 28px;
             background:#3b82f6;
             color:#ffffff;
             text-decoration:none;
             border-radius:8px;word-break:break-all;font-size:14px;">
         http://${process.env.URL}/login
     </p>
  
  </div>
  `;
    }

    return res.send(html);
  } catch (error) {
    return res.status(400).json({
      message: "Invalid or expired token",
      error: error.message,
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid credentials, Invalid email or password",
      success: false,
      err: "User not found",
    });
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return res.status(400).json({
      message: "Invalid credentials, Invalid email or password",
      success: false,
      err: "Password incorrect",
    });
  }

  if (!user.verified) {
    return res.status(400).json({
      message: "Please verify your email before logging in",
      success: false,
      err: "Email not verified",
    });
  }
  const token = jwt.sign(
    { id: user._id, usernmae: user.usernmae, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.cookie("token", token);

  return res.status(200).json({
    message: "User loggined successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

async function resend(req, res) {
  const { username, email, password } = req.body; // ya req.query, jaisa tum bhejte ho

  try {
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found, please sign up first",
      });
    }

    if (user.verified) {
      return res.status(400).json({
        message: "Email already verified, please login",
      });
    }

    // naya token banao (signup ke time jaisa banaya tha)
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);

    const verifyLink = `http://${process.env.URL}/api/auth/verify-email?token=${token}`;
    // signup wala mail bhejne ka function yaha call karo
    // maan lo tumhara function ka naam sendEmail for verification hai
    await sendEmail({
      to: user.email,
      subject: "Verify your email - Perplexity",
      html: `
    <p>Hi ${user.username},</p>
    <p>Please verify your email address by clicking the link below:</p>
    <a href="${verifyLink}">Verify Email</a>
    <p>If you did not create an account, please ignore this email.</p>
    <p>Best regards,<br>The Perplexity Team</p>
  `,
    });

    return res.status(200).json({
      message: "Verification email resent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}

export default { register, verifyEmail, login, resend };
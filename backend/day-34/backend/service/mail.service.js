import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

console.log({
  user: process.env.GOOGLE_USER,
  clientId: !!process.env.GOOGLE_CLIENT_ID,
  clientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
  refreshToken: !!process.env.GOOGLE_REFRESH_TOKEN,
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

try {
  await transporter.verify();
  console.log("Email transporter is ready to send emails");
} catch (err) {
  console.error("Verification failed:", err);
}

export async function sendEmail({ to, subject, html, text = "" }) {
  const mailOptions = {
    from: process.env.GOOGLE_USER,
    to,
    subject,
    html,
    text,
  };

  const details = await transporter.sendMail(mailOptions);

  return `Email sent successfully + ${to} & ${details}`;
}

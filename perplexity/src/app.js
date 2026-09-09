import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * 
 */
import authRouter from "./routes/auth.route.js";

/**
 * 
 */
app.use("/api/auth", authRouter);

// app.get("/", (req, res) => {
//   res.json({ message: "API is running successfully" });
// });

export default app;

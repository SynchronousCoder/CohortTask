import express from "express";
import authRouter from "./routes/auth.route.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use(errorHandler)

export default app;
const express = require("express");
const authRouter = require("./routes/auth.routes");
const cookie = require("cookie-parser");

const app = express();
app.use(express.json());
//using cookie-parser middleware to parse cookies in the request
app.use(cookie());

//using all authentication API's : Very Important Step...
app.use("/api/auth", authRouter);

module.exports = app;
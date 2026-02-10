const express = require("express");
const authRoute = require("./routes/auth.route");
const cookie = require("cookie-parser");

const app = express();
app.use(express.json());
app.use("/api/auth", authRoute);
app.use(cookie());

module.exports = app;
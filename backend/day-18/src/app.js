const express = require("express")
const cookie = require("cookie-parser")

const app = express()
app.use(express.json())
app.use(cookie())

const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");

app.use("/api/auth", authRouter)
app.use("/api/post", postRouter)

module.exports = app;
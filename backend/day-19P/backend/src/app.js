const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// Routes required (path)
const authRouter = require('./routes/auth.route');
const postRouter = require('./routes/post.route');
const followRouter = require('./routes/user.route');

// Routes Using 
app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)
app.use("/api/users", followRouter)

module.exports = app
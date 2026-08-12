require("dotenv").config()
const { connect } = require("node:http2")
const app = require("./src/app")
const connectDB = require("./src/config/database")

app.listen(3000, () => {
    console.log("App is running on port 3000")
})

connectDB()
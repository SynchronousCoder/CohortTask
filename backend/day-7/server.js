//server running + databse connection
require("dotenv").config();
const app = require("./src/app");
const mongoose = require("mongoose");
const connectDB = require("./config/database");

connectDB();
app.listen(3000, () => {
    console.log("Server is running at port 3000");
})

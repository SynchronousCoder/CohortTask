const mongoose = require("mongoose");

function connectDB() {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database is connected");
    })
}

module.exports = connectDB;
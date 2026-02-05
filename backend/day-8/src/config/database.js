const mongoose = require("mongoose");

function connectDB() {
    mongoose.connect("mongodb+srv://aryan_op:ldOiiyEPLEKbnVCf@cluster0.vf5c1jf.mongodb.net/day-8")
    .then(() => {
        console.log("Database is connected");   
    })
}

module.exports = connectDB;
const mongoose = require("mongoose");

function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Server is connected to Database")
    })
}

module.exports = connectDB;
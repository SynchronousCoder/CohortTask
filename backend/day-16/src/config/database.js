const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.MONGO_URI)
    .then( () => {
        console.log("Server is connected to DB")
    })
}

module.exports = connectDB;
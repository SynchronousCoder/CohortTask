const mongosse = require("mongoose"); 
function connectDB(){
    mongosse.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Databse is connected")
    })
}

module.exports = connectDB;
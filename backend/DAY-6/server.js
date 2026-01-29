//server running + connecting to database
const mongoose = require("mongoose");
const app = require("./src/app");

//connecting
function connectDB(){
    mongoose.connect("mongodb+srv://dontfollowmann_db_user:Pp4wnxR9SGBsDZEF@cluster0.36alxgj.mongodb.net/day-6")
    .then(() => {
        console.log("Server is Connect to database");
    })
}

connectDB();
app.listen(3000, () => {
    console.log("App is running at port 3000");
})
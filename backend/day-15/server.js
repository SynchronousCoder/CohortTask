require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/databse");

connectDB();

app.listen(3000, () => {
    console.log("App is running at port 3000");
})
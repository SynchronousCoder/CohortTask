const express = require('express');
const app = express();
const path = require('path');

//Setting up Parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Har request ke liye static file ko public mai find karna
app.use(express.static(path.join(__dirname, "public")))

//Setting up View Engine for EJS 
app.set("view engine", "ejs");
app.get("/", function(req, res){
    res.render("index");
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})
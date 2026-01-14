const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs')
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Calculating Files
app.get("/", function(req, res){
    fs.readdir(`./files`, function(err, files){
        res.render("koko", {files: files});
    })
})

//Making Files with Help of USER data
app.post("/create", function(req, res){
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.details, function(err){
        res.redirect("/")
    })
})

app.listen(3000, function(){
    console.log("Server running on port 3000");
});
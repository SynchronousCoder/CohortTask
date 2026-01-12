// const fs = require('fs');

// fs.appendFile('hey.txt', '\nMai To acha hu', function(err){
//     if(err) console.error(err);
//     else console.log('File written successfully');
// })
// console.log('File written successfully');

//---EXPRESS JS---//
const express = require('express');
const app = express();

app.use(function(req, res, next){
    console.log("I'm a middleware");
    next();
})

app.get("/", function(req, res){
    res.send("I'm Champion!");
})

app.get("/profile", function(req, res, next){
    // return next(new Error("Something Went Wrong!"))
    res.send("My COACH is Championnn!");
})

//Default Error Handler
app.use(function(err, req, res, next){
    console.log(err.stack);
    res.status(500).send("Something Broke!");
})

app.listen(3000);
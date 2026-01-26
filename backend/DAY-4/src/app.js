// server create karna
// server ko config karna

const express = require('express');
const app = express();

app.use(express.json());

const notes = [];

app.get("/", (req, res) => {
    res.send("Hola Amigo");
})

app.post("/notes", (req, res) => {
    notes.push(req.body)

    console.log(notes)
    res.send("note created")
})

app.get("/notes", (req, res) => {
    res.send(notes);

})

app.delete("/notes/:idx", (req, res) => {
    delete notes[req.params.idx];
    res.send("Node Deleted Succesfully");
})

app.patch("/notes/:idx", (req, res) => {
    notes[ req.params.idx ].description = req.body.description;

    res.send("Notes Updated")
})
module.exports = app;
const express = require('express');
const noteModel = require("./models/note.models");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("./public"))

app.post('/api/notes', async (req, res) => {
    const {title, description} = req.body;

    noteModel.create({title, description});

    res.status(201).json({
        message: "Note created successfully"
    })
})

app.get("/api/notes", async (req, res) => {
    const notes = await noteModel.find();

    res.status(200).json({
        message: "Notes retrieved successfully", notes
    })
})

app.delete("/api/notes/:id", async (req, res) => {
    const {id} = req.params;

    await noteModel.findByIdAndDelete(id);

    res.status(200).json({
        message: "Note deleted successfully"
    })
})

app.patch("/api/notes/:id", async (req, res) => {
    const {description} = req.body;
    const {id} = req.params;

    await noteModel.findByIdAndUpdate(id, {description});

    res.status(200).json({
        message: "Note updated successfully"
    })
})

//wildcard + middleware useage for static file of [js+css] line no:9
app.use("*name", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "/public/index.html"));
})

module.exports = app;
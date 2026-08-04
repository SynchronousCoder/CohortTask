const express = require("express")
const app = express()
const cors = require("cors")
const noteModel = require("./model/note.model")

app.use(express.json())
app.use(cors())
app.use(express.static("./public"))

app.post("/api/notes", async (req, res) => {
    const {title, description} = req.body
    const note = await noteModel.create({
        title: title,
        description: description
    })

    res.status(201).json({
        message: "Note Created Successfully",
        note
    })
})

app.get("/api/notes", async (req, res) => {
    const notes = await noteModel.find()
    res.status(200).json({
        message: "Notes fetched successfully",
        note: notes
    })
})

app.delete("/api/notes/:id", async (req, res) => {
    const {id} = req.params
    await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message: "Note deleted successfully"
    })
})

app.patch("/api/notes/:id", async (req, res) => {
    const {id} = req.params
    const {title, description} = req.body
    const note = await noteModel.findByIdAndUpdate(id, {
        title: title,
        description: description
    })

    res.status(200).json({
        message: "Note updated Successfully",
        note
    })
})

module.exports = app
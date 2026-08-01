const express = require("express")
const app = express()
const noteModel = require("../model/note.model")

app.use(express.json())

app.post("/", async (req, res) => {
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

app.get("/", async (req, res) => {
    const notes = await noteModel.find()
    res.status(200).json({
        message: "Notes fetched successfully",
        note: notes
    })
})

module.exports = app
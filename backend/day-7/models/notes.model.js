const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: String,
    description: String,
});

const noteModel = mongoose.model("notes", noteSchema); 
//model kai paramter mai first collection name and 2nd toh note ka format joh rahega

module.exports = noteModel;
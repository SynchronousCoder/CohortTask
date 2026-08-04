import React, { useEffect, useState } from "react";
import axios from "axios";
import Create from "./Create";
import Edit from "./Edit";
import { Link } from "react-router-dom";
const Note = () => {
  const [notes, setNotes] = useState([]);

  async function loadNotes() {
    const notes = await axios.get("http://localhost:3000/api/notes");
    // console.log(notes.data.note);
    setNotes(notes.data.note);
  }

  async function deleteNotes(id) {
    await axios.delete(`http://localhost:3000/api/notes/${id}`);
  }

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <>
      <Create loadNotes={loadNotes} />

      {/* //Notes card visibilty */}
      <div className="container">
        {notes.map((note, idx) => (
          <div key={idx} className="card">
            <h1 className="card-title">{note.title}</h1>
            <p className="card-desc">{note.description}</p>
            <button
              className="delete-btn"
              onClick={async (id) => {
                id = note._id;
                console.log(id);
                await deleteNotes(id);
                loadNotes();
              }}
            >
              Delete
            </button>
            <button className="edit-btn">
              <Link to={`/edit/${note._id}`} state={note}>
                Edit
              </Link>
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Note;

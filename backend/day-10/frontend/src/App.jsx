import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function App() {

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((raw) => {
      setNotes(raw.data.notes);
    });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  const [notes, setNotes] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const target = e.target.elements;
    const title = target.title.value;
    const description = target.description.value;

    axios.post("http://localhost:3000/api/notes", { title, description }).then(() => {
      fetchNotes(); 
      e.target.reset();
    })
  }

  function handleDelete(noteId) {
    axios.delete(`http://localhost:3000/api/notes/${noteId}`)
    .then(() => {
      fetchNotes();
    })
  }

  function handleEdit(noteId){
    const editDescription = document.querySelector(".note-form input[name='editDescription']");
    axios.patch(`http://localhost:3000/api/notes/${noteId}`, {description: editDescription.value})
    .then(() => {
      fetchNotes();
      editDescription.value = "";
    })
  }

  return (
    <>

    <form className="note-form" onSubmit={handleSubmit}>
      <input name="title" type="text" placeholder="Enter the title" />
      <input name="description" type="text" placeholder="Enter the description" />

      <input name="editDescription" type="text" placeholder="Enter the Edit description"/>

      <button>Create</button>
    </form>

      <div className="notes">
        {notes.map((note) => {
          return (
            <div className="note">
              <h2>{note.title}</h2>
              <p>{note.description}</p>

              <div className="btn">
                <button className="delete" onClick={() => handleDelete(note._id)}>Delete</button>
                <button className="edit" onClick={() => handleEdit(note._id)}>Edit</button>
              </div>

            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;

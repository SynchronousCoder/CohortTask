import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function App() {
  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  const [notes, setNotes] = useState([]);

  function submitHandle(e) {
    e.preventDefault();

    const { title, description } = e.target.elements;
    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  }

  function deleteHandle(noteId) {
    console.log(noteId);
    axios.delete(`http://localhost:3000/api/notes/${noteId}`).then((res) => {
      fetchNotes();
    });
  }

  function edited(noteID) {
    console.log(noteID);
    axios
      .patch(`http://localhost:3000/api/notes/${noteID}`, {
        description: document.querySelector(`[name="editDescription"]`).value,
      })
      .then((res) => {
        fetchNotes();
      });
  }

  return (
    <>
      <form className="note-creation" onSubmit={submitHandle}>
        <input name="title" type="text" placeholder="Enter title" />
        <input name="description" type="text" placeholder="Enter description" />
        <input name="editDescription" type="text" placeholder="Edit description"/>
        <button>Create</button>
        {/* <button>Edit</button> */}
      </form>

      <div className="notes">
        {notes.map((note) => {
          return (
            <div className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <div className="buttons">
                <button
                  className="delete"
                  onClick={() => deleteHandle(note._id)}
                >
                  Delete
                </button>
                <button className="edit" onClick={() => edited(note._id)}>
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;

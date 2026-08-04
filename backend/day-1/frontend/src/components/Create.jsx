import axios from "axios";
import React, { useState } from "react";
const Create = (props) => {
  const loadnotes = props.loadNotes;
//   console.log(loadnotes);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    await axios.post("https://cohorttask.onrender.com/api/notes", {
      title: title,
      description: desc,
    });
    loadnotes();
    setTitle("");
    setDesc("");
  }
  return (
    <div className="form-wrapper">
      <form
        className="note-form"
        method="POST"
        action="https://cohorttask.onrender.com/api/notes"
        onSubmit={handleSubmit}
      >
        <input
          className="form-input"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          type="text"
          placeholder="Title"
        />
        <input
          className="form-input"
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          type="text"
          placeholder="Description"
        />
        <button
          className="submit-btn"
          onClick={() => {
            console.log("submit");
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
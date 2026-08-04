import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  let { id } = useParams();

  async function loadNotes() {
    const res = await axios.get("http://localhost:3000/api/notes");
    const singleNote = await res.data.note.find((n) => n._id === id);
    if (singleNote) {
      setTitle(singleNote.title);
      setDesc(singleNote.description);
    }
    setNotes(res.data.note);
  }

  async function handelSubmit(e) {
    e.preventDefault();
    await axios.patch(`http://localhost:3000/api/notes/${id}`, {
      title: title,
      description: desc,
    });
    navigate("/");
  }

  useEffect(() => {
    loadNotes();
  }, []);

  return (
    <div className="edit-wrapper">
      <form className="edit-form" onSubmit={handelSubmit}>
        <input
          className="edit-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Edit Title"
        />
        <input
          className="edit-input"
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Edit Description"
        />
        <button className="update-btn">Update</button>
      </form>
    </div>
  );
};

export default Edit;

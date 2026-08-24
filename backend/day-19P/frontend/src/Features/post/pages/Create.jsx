import React, { useState, useRef } from "react";
import postAuth from "../hooks/postAuth";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate()
  const [caption, setCaption] = useState("");
  const postImageInputFileRef = useRef(null);

  const {loading, handleCreatePost} = postAuth()

  async function handleSubmit(e) {
    e.preventDefault();
    const file = postImageInputFileRef.current.files[0];

    await handleCreatePost(file, caption)
    navigate("/home")
  }

  if(loading){
    return (
        <main>
            <h1>Creating Post...</h1>
        </main>
    )
  }

  return (
    <div className="create">
      <form className="create__form" onSubmit={handleSubmit}>

        {/* 2 way binding */}
        <label className="create__label">Caption</label>
        <input
          value={caption}
          onChange={(e) => {
            setCaption(e.target.value);
          }}
          className="create__input"
          type="text"
          placeholder="Write caption"
        />

        {/* UseRef is used [in case of image file-> no 2 way binding] */}
        <label htmlFor="postImage">Select Image</label>
        <input
          ref={postImageInputFileRef}
          hidden
          className="create__input"
          type="file"
          name="postImage"
          id="postImage"
        />

        <button
          className="create__button"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default Create;
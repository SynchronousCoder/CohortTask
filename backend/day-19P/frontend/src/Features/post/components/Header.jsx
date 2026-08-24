import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <header className="posts__header">

          <div className="posts__header-top">

            <span className="posts__eyebrow">
              NØVA / FEED
            </span>

            <span className="posts__status">
              LIVE
            </span>

          </div>

          <h1 className="posts__title">
            Discover<span>.</span>
          </h1>

          <div className="posts__header-line" />

        </header>
        <button
          className="posts__create-button ri-add-line"
          onClick={() => {
            navigate("/create-post");
          }}
        >
          Create Post
        </button>


      </div>
    </>
  );
};

export default Header;
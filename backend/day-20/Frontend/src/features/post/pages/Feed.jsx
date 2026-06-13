import React, { useEffect } from "react";
import Post from "../components/Post";
import "../shared/feed.scss";
import { usePost } from "../hooks/usePost";
import { Link, useNavigate } from "react-router-dom";

const Feed = () => {
  const { feed, loading, handleGetFeed } = usePost();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetFeed();
  }, []);
  console.log(feed);
  if (loading || !feed) {
    return (
      <div className="feed-wrapper">
        <div className="feed-loading">Loading feed</div>
      </div>
    );
  }

  return (
    <div className="feed-wrapper">

      {/* ── NAVBAR ─────────────────────────────── */}
      <nav className="navbar">
        <Link to="/feed" className="navbar__logo">Pulse</Link>

        <div className="navbar__actions">
          {/* Home */}
          <Link to="/feed" className="navbar__icon-btn" title="Home">
            <i className="ri-home-5-line" />
          </Link>

          {/* Explore */}
          <Link to="/explore" className="navbar__icon-btn" title="Explore">
            <i className="ri-compass-3-line" />
          </Link>

          {/* Create Post */}
          <button
            className="navbar__create-btn"
            onClick={() => navigate("/create")}
          >
            <i className="ri-add-line" />
            Post
          </button>

          {/* Profile avatar */}
          <Link to="/profile" className="navbar__avatar" title="Profile">
            <div>P</div>
          </Link>
        </div>
      </nav>

      {/* ── FEED ───────────────────────────────── */}
      <div className="feed">
        {feed.map((post) => (
          <Post user={post.user} key={post._id} post={post} />
        ))}
      </div>

    </div>
  );
};

export default Feed;
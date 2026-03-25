import { useState, useEffect } from "react";
import "../shared/post.scss";

const Post = ({ user, post, loading }) => {

  return (
    <>
      <div className="post">
        {/* TOP */}
        <div className="top">
          <div className="pfp-wrap">
            <img src={`${user.profileImage}`} alt="pfp" />
          </div>
          <div className="user-info">
            <h1>{user.username}</h1>
          </div>
          <button className="more-btn">
            <i className="ri-more-fill" />
          </button>
        </div>

        {/* POST IMAGE */}
        <div className="post-img">
          <img src={post.imgUrl} alt="post" />
        </div>

        {/* CAPTION */}
        <div className="lower">
          <p>
            <span className="username">{user.username}</span>
            {post.caption}
          </p>
        </div>
      </div>
    </>
  );
};

export default Post;

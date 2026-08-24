import React, { useEffect } from "react";
import postAuth from "../hooks/postAuth";
import "../styles/style.scss";
import Header from "../components/header";
import Post from "../components/Post";

const Feed = () => {
  const { handleAllPost, loading, posts, feeds } = postAuth();

  useEffect(() => {
    handleAllPost();
    // console.log(feeds);
  }, []);

  return (
    <div className="posts">
      <main className="posts__main">
        <Header />

        <section className="posts__feed">
          {loading && (
            <div className="posts__loading">
              <span className="posts__loading-ring" />
              <span>Loading your world</span>
            </div>
          )}

          {feeds &&
            feeds.map((post, idx) => {
              console.log(post)
              return (
                <Post post={post} user={post.user} idx={idx} key={idx} />
              );
            })}
        </section>
      </main>
    </div>
  );
};

export default Feed;

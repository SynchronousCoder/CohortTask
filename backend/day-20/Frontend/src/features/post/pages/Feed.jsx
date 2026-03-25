import React, { useEffect } from "react";
import Post from "../components/Post";
import "../shared/feed.scss";
import { usePost } from "../hooks/usePost";

const Feed = () => {
  const { feed, loading, handleGetFeed } = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading || !feed) {
    return (
      <main>
        <h1>Feed is loading...</h1>
      </main>
    );
  }

  console.log(feed);

  return (
    <div className="feed-wrapper">
      <div className="navbar"></div>
      <div className="feed">
        {feed.map((post) => {
          return <Post user={post.user} key={post._id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default Feed;

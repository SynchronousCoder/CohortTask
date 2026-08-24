import { createContext, useState } from "react";

export const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [feeds, setFeeds] = useState(null);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  return (
    <PostContext.Provider value={{ feeds, setFeeds, posts, setPosts, loading, setLoading }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;

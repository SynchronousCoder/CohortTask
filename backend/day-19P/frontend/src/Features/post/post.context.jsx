import { createContext, useState } from "react";

export const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);
  return (
    <PostContext.Provider value={{ posts, setPosts, loading, setLoading }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;

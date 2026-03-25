import { createContext, useState } from "react";
// import { postFeed } from "./services/post.api";
export const PostContext = createContext();

export function PostProvider({ children }) {
  const [feed, setFeed] = useState(null);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <PostContext.Provider value={{ feed, setFeed,loading, setLoading, post, setPost }}>
      {children}
    </PostContext.Provider>
  );
}

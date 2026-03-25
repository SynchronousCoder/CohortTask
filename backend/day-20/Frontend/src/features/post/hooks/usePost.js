import { useContext } from "react";
import { PostContext } from "../post.context";
import { getFeed } from "../services/post.api";

export function usePost() {
  const context = useContext(PostContext);

  const { feed, setFeed, loading, setLoading, post, setPost } = context;

  async function handleGetFeed() {
    setLoading(true);
    const data = await getFeed();
    setFeed(data.posts);
    setLoading(false);
  }

  return {
    feed,
    loading,
    post,
    handleGetFeed,
  };
}

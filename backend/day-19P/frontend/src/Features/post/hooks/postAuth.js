import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";
import { getAllPost, createPost } from "../services/post.api";
const postAuth = () => {
  const context = useContext(PostContext);
  const { feeds, setFeeds, posts, setPosts, loading, setLoading } = context;

  async function handleAllPost() {
    setLoading(true);
    try {
      const data = await getAllPost();
      setFeeds(data.posts);
      console.log("f=>", data);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function handleCreatePost(imageFile, caption) {
    setLoading(true);
    try {
      const data = await createPost(imageFile, caption);
      // setPosts(data.post)
      setFeeds([data.post, ...feeds]);
      console.log("res=> ", posts, "=> ", feeds);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleAllPost();
  }, []);
  
  return { handleAllPost, handleCreatePost, loading, posts, feeds };
};

export default postAuth;

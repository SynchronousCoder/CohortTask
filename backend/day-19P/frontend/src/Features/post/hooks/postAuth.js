import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";
import { getAllPost, createPost, likePost, unLikePost } from "../services/post.api";
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

  async function handleLike(postId) {
    await likePost(postId)
    await handleAllPost()
    console.log("post liked", postId)
  }

  async function handleUnLike(postId) {
    await unLikePost(postId)
    await handleAllPost()
    console.log("post unliked", postId)
  }

  useEffect(() => {
    handleAllPost();
  }, []);
  
  return { handleAllPost, handleCreatePost, handleLike, handleUnLike, loading, posts, feeds };
};

export default postAuth;

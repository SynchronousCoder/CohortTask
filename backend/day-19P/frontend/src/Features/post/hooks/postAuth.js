import { useContext } from "react";
import { PostContext } from "../post.context";
import { getAllPost } from "../services/post.api";
const postAuth = () => {
    const context = useContext(PostContext)
    const {posts, setPosts, loading, setLoading} = context

    async function handleAllPost() {
        setLoading(true)
        try {
            const response = await getAllPost()
            setPosts(response.posts)
            console.log("f=>", response)
        } catch (error) {
            throw error
        }finally{
            setLoading(false)
        }
    }
  return {handleAllPost, loading, posts}
}

export default postAuth

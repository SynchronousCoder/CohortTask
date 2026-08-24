import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/posts",
    withCredentials: true
})

export async function getAllPost() {
    const response = await api.get("/feed")
    return response.data
}

export async function createPost(imageFile, caption) {
    /**
     * You can't send the file directly by using axios u need to use formData for the same task
     */
    const formData = new FormData()
    formData.append("image", imageFile)
    formData.append("caption", caption)
    
    const response = await api.post("/", formData)
    return response.data
}
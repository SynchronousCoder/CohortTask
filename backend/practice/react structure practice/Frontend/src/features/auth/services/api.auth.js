//API LAYER - we will fetch all auth api here from backend
//enable cors and also set baseurl to allow token to save in cookie storage
import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})

export async function login(username, password) {
    const response = await api.post("/login", {
        username, password
    })
   return response.data
}
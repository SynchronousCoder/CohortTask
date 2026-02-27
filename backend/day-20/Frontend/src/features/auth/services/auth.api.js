//this file will communicate to backend folder...
import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})

export async function Register(username, email, password) {
    try{
        const response = await api.post("/register", {
            username,
            email,
            password
        })
    }catch(err){
        throw err
    }
}

export async function Login(username, password) {
    try {
        const response = await api.post("/login", {
            username,
            password
        })
    } catch (error) {
        throw error
    }
}

export async function getMe(id) {
    try {
        const resposne = api.get("/get-me", {
            id
        })
    } catch (error) {
        throw error
    }
}
//we need to call these function in hooks folder
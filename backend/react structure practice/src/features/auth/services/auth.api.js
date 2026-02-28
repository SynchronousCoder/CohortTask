import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
})

function authApi() {
     async function Login(username, password) {
        const resposne = await api.post("/login", {
            username, password
        })
        return resposne  
    }

    async function Register(username, email, password) {
        const response = await api.post("/register", {
            username, email, password
        })
        return response
    }

    // expose the methods
    return {
        Login,
        Register
    };
}

export default authApi;
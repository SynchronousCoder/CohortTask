//this file will communicate to backend folder...
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export async function Register(username, email, password) {
  const response = await api.post("/register", {
    username,
    email,
    password,
  });

  return response.data;
}

export async function Login(username, password) {
  const response = await api.post("/login", {
    username,
    password,
  });

  return response.data;
}

export async function getMe(id) {
  const response = await api.get("/get-me", {
    id,
  });

  return response.data;
}

//we need to call these function in hooks folder
import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3000/api/users",
    withCredentials: true
})

export async function seeFollower() {
    const response = await api.get("/follower")
    return response.data
}

export async function seeFollowing() {
    const response = await api.get("/following")
    return response.data
}


export async function seeUnFollowing(){
    const response = await api.get("/unfollowing")
    return response.data
}
//This is state lauer used to manage and implement the service layer
import { createContext, useState } from "react";
import {Login, Register} from "./services/auth.api"
export const AuthContext = createContext();

export function AuthProvider( {children} ) {
    const [user, setUser] = useState("")
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setLoading(true)
        try{
            const response = await Login(username, password)
            setUser(response.user)
            return setUser
        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }
    }

    const handleRegister = async () => {
        setLoading(true)
        try {
            const response = await Register(username, email, password)
            setUser(response.user)
            return setUser
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    const values = {
        user, loading, handleLogin, handleRegister
    }

    return(
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}
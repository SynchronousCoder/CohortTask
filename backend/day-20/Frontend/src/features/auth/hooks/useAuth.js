import { useContext } from "react";
import { authContext } from "../auth.context"


export function useAuth() {
    const context = useContext(authContext)
    return context
}
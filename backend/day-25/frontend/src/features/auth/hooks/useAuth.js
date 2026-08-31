import React from "react";
import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login } from "../services/auth.api";
const useAuth = () => {
  const context = useContext(AuthContext);
  const { loading, setLoading, user, setUser } = context;

  async function handleLogin(username, email, password) {
    setLoading(true);
    try {
      const data = await login(username, email, password);
      setUser(data.user);
      console.log("login ans=>", data.user);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return {handleLogin, user, loading}
}

export default useAuth;

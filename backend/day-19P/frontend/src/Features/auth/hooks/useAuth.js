// //State+Service Layer Logic

import { useContext } from "react";
import { register, login, getMe } from "../services/auth.api";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  async function handleRegister() {
    setLoading(true);

    try {
      const response = await register(username, email, password);
      setUser(response.user);
      console.log("answer=> ", response);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(username, password) {
    setLoading(true);
    try {
      const response = await login(username, password);
      setUser(response.user);
      console.log("answer=> ", response.user);
    } catch (error) {
      throw error;
      console.log(loading);
    } finally {
      setLoading(false);
    }
  }

  return { handleLogin, handleRegister, loading, user };
};

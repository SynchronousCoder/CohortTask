//this state will managae both API + STATE layer

import { useContext } from "react";
import { login } from "../services/api.auth";
import { AuthContext } from "../auth.context.jsx";

export const useAuth = () => {
  const context = useContext(AuthContext);

  const { users, setUsers, loading, setLoading } = context

  async function handleLogin(username, password) {
    setLoading(true);
    try {
      const response = await login(username, password);
      setUsers(response.user);
      return response.user;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    users,
    loading,
    handleLogin
  }
};

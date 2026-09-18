import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { register, login, getMe } from "../service/auth.api";
const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  async function handleRegister({ username, email, password }) {
    try {
      const data = await register({ username, email, password });
      setUser(data.user);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin({ email, password }) {
    try {
      const data = await login({ email, password });
      setUser(data.user);
      console.log("ans=>", data.user)
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function handleGetMe() {
    try {
      const data = await getMe();
      setUser(data.user);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleGetMe()
  }, [])

  return { handleRegister, handleLogin, handleGetMe, user, loading };
};

export default useAuth;

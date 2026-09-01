import React, { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, getMe} from "../services/auth.api";
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

  async function handleRegister({username, email, password}) {
    setLoading(true)
    try {
      const data = await register({username, email, password})
      setUser(data.user)
    } catch (error) {
      throw error
    }finally{
      setLoading(false)
    }
  }

  async function handleGetMe(){
    setLoading(true)
    try {
      const data = await getMe()
      setUser(data.user)
    } catch (error) {
      setUser(null)
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    handleGetMe()
  }, [])

  return {handleLogin, handleRegister, user, loading}
}

export default useAuth;

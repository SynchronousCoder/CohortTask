//It's state layer - store and managed shared data [API ka response aata hai yaha!!]
import { createContext, useContext, useState } from "react";
import { Register, Login, getMe } from "./services/auth.api";

export const authContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (username, password) => {
    setLoading(true);

    try {
      const response = await Login(username, password);
      setUser(response.user);
      return response;
    } catch (error) {
      console.log(error);
    }finally{
        setLoading(false)
    }
  };

  const handleRegister = async (username, email, password) => {
    setLoading(true);

    try {
      const response = await Register(username, email, password);
      setUser(response.user);
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

return (
  <authContext.Provider
    value={{ user, loading, handleLogin, handleRegister }}
  >
    {children}
  </authContext.Provider>
);
}
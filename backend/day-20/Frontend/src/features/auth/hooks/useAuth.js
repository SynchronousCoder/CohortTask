import { useContext } from "react";
import { authContext } from "../auth.context";
import { Register, Login, getMe } from "../services/auth.api";

export function useAuth() {
  const context = useContext(authContext);
  const { user, loading, setUser, setLoading } = context;

  const handleLogin = async (username, password) => {
    setLoading(true);
    try {
      const response = await Login(username, password);
      setUser(response.user);
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    try {
      const response = await Register(username, email, password);
      setUser(response.user);
      return response;
    } catch (error) {
        console.log(error)
    }finally{
        setLoading(false)
    }
  };

    return {
        user, loading, handleLogin, handleRegister
    }
}

//  const handleLogin = async (username, password) => {
//     setLoading(true);
//     try {
//       const response = await Login(username, password); // Axios call
//       setUser(response.user);
//       return response;
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRegister = async (username, email, password) => {
//     setLoading(true);

//     try {
//       const response = await Register(username, email, password);
//       setUser(response.user);
//       return response;
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

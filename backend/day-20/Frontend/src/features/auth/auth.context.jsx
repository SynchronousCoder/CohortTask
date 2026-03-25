//It's state layer - store and managed shared data [API ka response aata hai yaha!!]
import { createContext, useContext, useState } from "react";
import { Register, Login, getMe } from "./services/auth.api";

export const authContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);


  return (
    <authContext.Provider
      value={{ user, loading, setUser, setLoading }}
    >
      {children}
    </authContext.Provider>
  );
}

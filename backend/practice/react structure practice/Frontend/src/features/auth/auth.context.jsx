//This is State Layer - all the logic of connectivity between Frontend & Backend
// will be written down here + managed the states too...
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(null);

  return (
    <AuthContext.Provider value={{ users, setUsers, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );

};
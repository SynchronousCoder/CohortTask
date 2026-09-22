import React, { useContext } from "react";
import { AuthContext } from "../auth.context";
import { Navigate } from "react-router";

const Protected = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (loading) {
    return <div>Loading... ${user}</div>;
  }

  return children;
};

export default Protected;

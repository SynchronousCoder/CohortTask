import React, { useContext } from "react";
import { AuthContext } from "../auth.context";
import { Navigate } from "react-router";

const Protected = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;

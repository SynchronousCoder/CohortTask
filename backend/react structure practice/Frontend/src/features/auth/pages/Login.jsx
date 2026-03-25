import React, { useState } from "react";
import "../shared/form.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { users, loading, handleLogin } = useAuth();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await handleLogin(user, password);
    navigate("/login");
  }
  return (
    <div className="main">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input
            onInput={(e) => {
              setUser(e.target.value);
            }}
            type="text"
            placeholder="Enter your username"
          />

          <input
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Enter your password"
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

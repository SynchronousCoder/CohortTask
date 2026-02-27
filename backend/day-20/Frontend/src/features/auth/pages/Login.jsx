import React, { useState } from "react";
import "../shared/auth.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const {user, loading, handleLogin } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    await handleLogin(username, password)
    navigate("/")
  } 

  return (
    <div>
      <div className="card">
        <h1>Login</h1>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <input
              onInput={(e) => {
                setUsername(e.target.value);
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
            <button type="submit">LogIn</button>
          </form>
          <p>
            Don't have an account <Link to={"/register"}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

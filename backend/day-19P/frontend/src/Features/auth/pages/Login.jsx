import React, { useState } from "react";
import "../styles/style.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const {loading, handleLogin} = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  async function handleSubmit(e){
    e.preventDefault()
    await handleLogin(username, password)
    navigate("/home")
  }

  if(loading){
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <div className="register">
      <main className="register__main">
        <h1 className="register__title">Login.</h1>

        <form onSubmit={handleSubmit} className="register__form">
          <input
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            className="register__input"
            type="text"
            placeholder="Enter your username"
          />

          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            className="register__input"
            type="text"
            placeholder="Enter your password"
          />

          <button className="register__button">
            <span>Login</span>
            <span className="register__button-arrow">↗</span>
          </button>

          <p className="register__link-text">
            Don't have an account <Link to={"/register"}>Register</Link>
          </p>
        </form>
      </main>
    </div>
  );
};

export default Login;

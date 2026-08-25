import React, { useState } from "react";
import "../styles/style.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const {handleRegister, loading} = useAuth()

  const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e){
    e.preventDefault()
    await handleRegister(username, email, password)
    navigate("/home")
  }

  if(loading){
    <main>
      <h1>Loading...</h1>
    </main>
  }
  return (
    <div className="register">
      <main className="register__main">
        <h1 className="register__title">Create.</h1>

        <form onSubmit={(e) => {handleSubmit(e)}} className="register__form">
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
              setEmail(e.target.value);
            }}
            value={email}
            className="register__input"
            type="text"
            placeholder="Enter your email"
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
            <span>Sign Up</span>
            <span className="register__button-arrow">↗</span>
          </button>

          <p className="register__link-text">
            Have an account <Link to={"/login"}>Login</Link>
          </p>
        </form>
      </main>
    </div>
  );
};

export default Register;

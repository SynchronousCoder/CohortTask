import React, { useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e){
    e.preventDefault()
    const call = await axios.post("http://localhost:3000/api/auth/register", {
        username,
        email,
        password
    }, {
        withCredentials: true
    })
    
    console.log(call.data)
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

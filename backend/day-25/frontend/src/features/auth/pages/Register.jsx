import React, { useState } from "react";
import "../style/style.scss";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { handleRegister, user, loading } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/home");
  }
  
  return (
    <div className="auth-page">
      <div className="auth-glow auth-glow-one"></div>
      <div className="auth-glow auth-glow-two"></div>

      <form
        className="auth-form"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="auth-header">
          <div className="auth-logo">M</div>

          <span className="auth-label">WELCOME BACK</span>

          <h1>
            Register in <span>Moodify</span>
          </h1>

          <p>Continue your journey into real-time expression intelligence.</p>
        </div>

        <div className="auth-fields">

          <div className="auth-field">
            <label>USERNAME</label>

            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Enter your username"
            />
          </div>

          <div className="auth-field">
            <label>EMAIL</label>

            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your email"
            />
          </div>

          <div className="auth-field">
            <label>PASSWORD</label>

            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter your password"
            />
          </div>

        </div>

        <button className="auth-button">
          Register
          <span>→</span>
        </button>

        <p className="auth-switch">
          Already have an account <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;

import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="register">
      <main className="register__main">
        <h1 className="register__title">Login.</h1>

        <form className="register__form">
          <input
            className="register__input"
            type="text"
            placeholder="Enter your username"
          />

          <input
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

export default Register;

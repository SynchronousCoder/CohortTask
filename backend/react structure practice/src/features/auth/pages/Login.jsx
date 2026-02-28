import React from "react";
import "../shared/form.scss";
const Login = () => {

  function handleSubmit(e) {
    e.preventDefault();
  }
  
  return (
    <div>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="enter your username" />
          <input type="password" placeholder="enter your password" />
          <button type="submit">LogIn</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

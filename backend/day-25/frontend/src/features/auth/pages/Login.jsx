import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../style/style.scss";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin, user, loading } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await handleLogin(username, email, password);
    navigate("/home");
  }

  // if (loading) {
  //   return (
  //     <main className="auth-loading">
  //       <h1>Loading...</h1>
  //     </main>
  //   );
  // }

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

          <h1>Sign in to <span>Moodify</span></h1>

          <p>
            Continue your journey into real-time expression intelligence.
          </p>
        </div>

        <div className="auth-fields">
          <div className="auth-field">
            <label>USERNAME / EMAIL</label>

            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Enter your username/email"
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
          Login
          <span>→</span>
        </button>

        <p className="auth-switch">
          Don't have an account{" "}
          <a href="/register">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
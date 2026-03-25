import React, { useState, useEffect, useRef } from "react";
import "../shared/auth.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { user, loading, handleLogin } = useAuth();
  const canvasRef = useRef(null);
  const blobRef = useRef(null);
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const animRef = useRef(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // ── Mouse-reactive dot field ──────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const blob = blobRef.current;
    const ctx = canvas.getContext("2d");

    const COLS = 28;
    const ROWS = 18;
    let W, H, dots;

    const buildDots = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      dots = [];
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          dots.push({
            bx: (c / (COLS - 1)) * W,
            by: (r / (ROWS - 1)) * H,
            x: (c / (COLS - 1)) * W,
            y: (r / (ROWS - 1)) * H,
          });
        }
      }
    };

    buildDots();

    const onResize = () => buildDots();
    const onMove = (e) => {
      const cx = e.clientX ?? e.touches?.[0]?.clientX ?? mouseRef.current.x;
      const cy = e.clientY ?? e.touches?.[0]?.clientY ?? mouseRef.current.y;
      mouseRef.current = { x: cx, y: cy };
      // Move blob
      blob.style.left = cx + "px";
      blob.style.top  = cy + "px";
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });

    const REPEL   = 130; // radius where dots get pushed
    const ATTRACT = 260; // radius of subtle pull-in
    const SPEED   = 0.06;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      dots.forEach((d) => {
        const dx = d.bx - mx;
        const dy = d.by - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let tx = d.bx;
        let ty = d.by;

        if (dist < REPEL && dist > 0) {
          // Push away from cursor
          const force = ((REPEL - dist) / REPEL) * 48;
          tx = d.bx + (dx / dist) * force;
          ty = d.by + (dy / dist) * force;
        } else if (dist < ATTRACT && dist > REPEL) {
          // Subtle pull toward cursor
          const t = (dist - REPEL) / (ATTRACT - REPEL);
          const force = (1 - t) * 8;
          tx = d.bx - (dx / dist) * force;
          ty = d.by - (dy / dist) * force;
        }

        d.x += (tx - d.x) * SPEED;
        d.y += (ty - d.y) * SPEED;

        // Colour based on proximity
        const proximity = Math.max(0, 1 - dist / ATTRACT);
        const r = Math.round(167 + proximity * 60);
        const g = Math.round(139 + proximity * 30);
        const b = Math.round(250);
        const alpha = 0.18 + proximity * 0.55;
        const radius = 1.6 + proximity * 3;

        ctx.beginPath();
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await handleLogin(username, password);
    if (res) navigate("/feed");
  }

  if (loading) return <h1 style={{ color: "#fff", textAlign: "center" }}>Loading…</h1>;

  return (
    <div className="auth-page">
      {/* Mouse-reactive dot canvas */}
      <canvas ref={canvasRef} className="auth-canvas" />

      {/* Glow blob that follows cursor */}
      <div ref={blobRef} className="auth-blob" />

      {/* Centered card — no navbar */}
      <div className="card">
        <h1>Login</h1>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <input
              onInput={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Enter your username"
            />
            <input
              onInput={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
            />
            <button type="submit">Log In</button>
          </form>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
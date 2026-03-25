import React, { useState, useEffect, useRef } from "react";
import "../shared/auth.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { user, loading, handleRegister } = useAuth();
  const canvasRef = useRef(null);
  const blobRef = useRef(null);
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const animRef = useRef(null);

  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
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
      blob.style.left = cx + "px";
      blob.style.top  = cy + "px";
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });

    const REPEL   = 130;
    const ATTRACT = 260;
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
          const force = ((REPEL - dist) / REPEL) * 48;
          tx = d.bx + (dx / dist) * force;
          ty = d.by + (dy / dist) * force;
        } else if (dist < ATTRACT && dist > REPEL) {
          const t = (dist - REPEL) / (ATTRACT - REPEL);
          const force = (1 - t) * 8;
          tx = d.bx - (dx / dist) * force;
          ty = d.by - (dy / dist) * force;
        }

        d.x += (tx - d.x) * SPEED;
        d.y += (ty - d.y) * SPEED;

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
    const res = await handleRegister(username, email, password);
    if (res) navigate("/login");
  }

  if (loading) return <h1 style={{ color: "#fff", textAlign: "center" }}>Loading…</h1>;

  return (
    <div className="auth-page">
      <canvas ref={canvasRef} className="auth-canvas" />
      <div ref={blobRef} className="auth-blob" />

      <div className="card">
        <h1>Register</h1>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <input
              onInput={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Enter your username"
            />
            <input
              onInput={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Enter your email"
            />
            <input
              onInput={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
            />
            <button type="submit">Register</button>
          </form>
          <p>
            Have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { handleLogin, user, loading } = useAuth();

  const navigate = useNavigate();

  const submitForm = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await handleLogin({ email, password });
      navigate("/");
    } catch (loginError) {
      setError(
        loginError.response?.data?.message ||
          loginError.message ||
          "Unable to log in. Please check your credentials."
      );
    }
  };

  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="min-h-screen bg-[#071215] px-4 py-6 text-white sm:px-6 lg:px-10">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c1c20] shadow-2xl shadow-black/40 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="relative hidden overflow-hidden bg-[#12353a] p-10 lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full border-[36px] border-[#c9f269]/20" />
          <div className="relative">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#c9f269]">Perplexity</p>
            <h2 className="mt-20 max-w-sm text-5xl font-semibold leading-[1.05] tracking-tight">
              Ideas move faster when you do.
            </h2>
          </div>
          <p className="relative max-w-xs text-sm leading-6 text-white/60">
            Your conversations, questions, and next great discovery are waiting.
          </p>
        </aside>

        <section className="flex items-center justify-center px-6 py-12 sm:px-12">
          <div className="w-full max-w-md">
            <div className="mb-10 lg:hidden">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#c9f269]">Perplexity</p>
            </div>
            <p className="text-sm font-medium text-[#c9f269]">Welcome back</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white">Sign in to continue</h1>
            <p className="mt-3 text-sm leading-6 text-white/50">Pick up where your curiosity left off.</p>

            <form onSubmit={submitForm} className="mt-9 space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/60">Email address</label>
                <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-white placeholder:text-white/25 outline-none transition focus:border-[#c9f269] focus:bg-white/[0.09] focus:ring-4 focus:ring-[#c9f269]/10" />
              </div>
              <div>
                <label htmlFor="password" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/60">Password</label>
                <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" required className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-white placeholder:text-white/25 outline-none transition focus:border-[#c9f269] focus:bg-white/[0.09] focus:ring-4 focus:ring-[#c9f269]/10" />
              </div>
              {error && <p role="alert" className="rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2 text-sm text-red-300">{error}</p>}
              <button type="submit" disabled={loading} className="w-full rounded-xl bg-[#c9f269] px-4 py-3.5 font-bold text-[#102022] transition hover:bg-[#d9fa86] focus:outline-none focus:ring-4 focus:ring-[#c9f269]/20 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Signing in..." : "Sign in"}</button>
            </form>

            <p className="mt-8 text-center text-sm text-white/45">New here? <Link to="/register" className="font-semibold text-[#c9f269] transition hover:text-white">Create an account</Link></p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;

import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../../global/home.scss";

const Home = () => {
  const blobRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Blob movement
      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${e.clientX - 225}px, ${e.clientY - 225}px)`;
      }

      // 3D Grid movement (subtle parallax)
      if (gridRef.current) {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        gridRef.current.style.transform = `
          perspective(1200px) 
          rotateX(${35 + y}deg) 
          rotateY(${x}deg) 
          scale(1.2)
        `;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="home">
      {/* cursor blob */}
      <div className="blob" ref={blobRef} />

      {/* NAV */}
      <nav className="nav">
        <span className="nav__logo">✦ brand</span>
        <div className="nav__links">
          <Link to="/login" className="nav__btn nav__btn--ghost">
            Log in
          </Link>
          <Link to="/register" className="nav__btn nav__btn--fill">
            Sign up
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero__tag">✦ the future is now</div>

        <h1 className="hero__heading">
          <span className="hero__heading--line">Create without</span>
          <span className="hero__heading--line accent">limits.</span>
        </h1>

        <p className="hero__sub">
          A space built for the next generation.
          <br />
          Sign up free — no credit card, no nonsense.
        </p>

        <div className="hero__cta">
          <Link to="/register" className="cta-primary">
            Get started →
          </Link>
          <Link to="/login" className="cta-secondary">
            I have an account
          </Link>
        </div>

        {/* 3D Floating Shapes */}
        <div className="hero__badge hero__badge--1">
          <div className="cube">
            <div className="cube__face cube__face--front">FREE</div>
            <div className="cube__face cube__face--back">100%</div>
            <div className="cube__face cube__face--right">OPEN</div>
            <div className="cube__face cube__face--left">ACCESS</div>
            <div className="cube__face cube__face--top">✦</div>
            <div className="cube__face cube__face--bottom">✦</div>
          </div>
        </div>

        <div className="hero__badge hero__badge--2">
          <div className="sphere"></div>
        </div>

        <div className="hero__badge hero__badge--3">
          <div className="torus">
            <div className="torus__ring"></div>
          </div>
        </div>
      </section>

      {/* GRID DECO (Interactive) */}
      <div className="grid-deco" ref={gridRef} aria-hidden="true">
        {Array.from({ length: 96 }).map((_, i) => (
          <div key={i} className="grid-deco__cell" />
        ))}
      </div>
    </div>
  );
};

export default Home;
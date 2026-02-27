import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../../global/home.scss'

const Home = () => {
  const blobRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!blobRef.current) return
      blobRef.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="home">

      {/* cursor blob */}
      <div className="blob" ref={blobRef} />

      {/* NAV */}
      <nav className="nav">
        <span className="nav__logo">✦ brand</span>
        <div className="nav__links">
          <Link to="/login" className="nav__btn nav__btn--ghost">Log in</Link>
          <Link to="/register" className="nav__btn nav__btn--fill">Sign up</Link>
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
          <br />Sign up free — no credit card, no nonsense.
        </p>

        <div className="hero__cta">
          <Link to="/register" className="cta-primary">Get started →</Link>
          <Link to="/login" className="cta-secondary">I have an account</Link>
        </div>

        {/* floating badges */}
        <div className="hero__badge hero__badge--1">100% free</div>
        <div className="hero__badge hero__badge--2">✦ no ads</div>
        <div className="hero__badge hero__badge--3">open access</div>

      </section>

      {/* GRID DECO */}
      <div className="grid-deco" aria-hidden="true">
        {Array.from({ length: 48 }).map((_, i) => (
          <div key={i} className="grid-deco__cell" />
        ))}
      </div>

    </div>
  )
}

export default Home
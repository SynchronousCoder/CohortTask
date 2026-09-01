import { useNavigate } from "react-router-dom";
import "../style/home.scss"

const Hero = () => {
  const navigate = useNavigate();

  return (
    <main className="hero">

      {/* Ambient background */}
      <div className="hero__ambient hero__ambient--one"></div>
      <div className="hero__ambient hero__ambient--two"></div>
      <div className="hero__ambient hero__ambient--three"></div>

      {/* Grain */}
      <div className="hero__noise"></div>

      {/* ================= NAVBAR ================= */}

      <nav className="hero__nav">

        <div className="hero__logo">
          <span className="hero__logo-mark">
            <span></span>
            <span></span>
          </span>

          <span className="hero__logo-text">
            moodify
          </span>
        </div>

        <div className="hero__nav-actions">

          <button
            className="hero__login"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

          <button
            className="hero__signup"
            onClick={() => navigate("/register")}
          >
            Sign up
          </button>

          <button
            className="hero__nav-button"
            onClick={() => navigate("/register")}
          >
            <span>Enter Moodify</span>
            <i>↗</i>
          </button>

        </div>

      </nav>


      {/* ================= HERO CONTENT ================= */}

      <section className="hero__content">

        {/* LEFT CONTENT */}

        <div className="hero__copy">

          <div className="hero__eyebrow">
            <span className="hero__eyebrow-dot"></span>

            <span>
              Music that feels like you
            </span>
          </div>


          <h1 className="hero__title">

            <span>
              Your mood.
            </span>

            <br />

            <span className="hero__title-gradient">
              Your music.
            </span>

          </h1>


          <p className="hero__description">
            Moodify detects how you feel and plays
            music that fits the moment.
          </p>


          <div className="hero__actions">

            <button
              className="hero__primary"
              onClick={() => navigate("/register")}
            >

              <span className="hero__primary-icon">
                ▶
              </span>

              <span>
                Discover your mood
              </span>

              <span className="hero__primary-arrow">
                ↗
              </span>

            </button>


            <button className="hero__secondary">

              <span className="hero__play-icon">
                ◉
              </span>

              See how it works

            </button>

          </div>

        </div>


        {/* ================= RIGHT VISUAL ================= */}

        <div className="hero__visual">

          <div className="hero__orb-wrapper">

            {/* Outer rings */}

            <div className="hero__ring hero__ring--one"></div>

            <div className="hero__ring hero__ring--two"></div>

            <div className="hero__ring hero__ring--three"></div>


            {/* Orbit */}

            <div className="hero__orbit hero__orbit--one">
              <span></span>
            </div>

            <div className="hero__orbit hero__orbit--two">
              <span></span>
            </div>


            {/* Main orb */}

            <div className="hero__orb">

              <div className="hero__orb-glow"></div>

              <div className="hero__orb-core">

                <div className="hero__orb-inner"></div>

                <div className="hero__orb-highlight"></div>

              </div>


              {/* Particles */}

              <span className="hero__particle hero__particle--one"></span>

              <span className="hero__particle hero__particle--two"></span>

              <span className="hero__particle hero__particle--three"></span>

              <span className="hero__particle hero__particle--four"></span>

            </div>


            {/* ================= MOOD CARD ================= */}

            <div className="hero__mood-card">

              <div className="hero__mood-card-top">

                <span>
                  Current mood
                </span>

                <span className="hero__mood-status">

                  <i></i>

                  detected

                </span>

              </div>


              <div className="hero__mood-main">

                <div className="hero__mood-emoji">
                  ✦
                </div>

                <div>

                  <strong>
                    Calm
                  </strong>

                  <span>
                    74% confidence
                  </span>

                </div>

              </div>


              <div className="hero__mood-wave">

                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>

              </div>

            </div>


            {/* ================= MUSIC CARD ================= */}

            <div className="hero__music-card">

              <div className="hero__music-art">

                <div className="hero__music-art-inner"></div>

              </div>


              <div className="hero__music-info">

                <span>
                  Now playing
                </span>

                <strong>
                  Something feels right
                </strong>

                <small>
                  Moodify mix · Calm
                </small>

              </div>


              <button className="hero__music-button">
                ❚❚
              </button>

            </div>

          </div>

        </div>

      </section>


      {/* ================= MINIMAL FOOTER ================= */}

      <div className="hero__bottom">

        <div className="hero__scroll">

          <span className="hero__scroll-circle">
            ↓
          </span>

          <span>
            Scroll to explore
          </span>

        </div>

      </div>

    </main>
  );
};

export default Hero;
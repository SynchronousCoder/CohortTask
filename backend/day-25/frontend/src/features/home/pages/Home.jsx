import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowDown,
    ArrowRight,
    Brain,
    Camera,
    Eye,
    Lock,
    ScanFace,
    Sparkles,
    Zap
} from "lucide-react";
import "../style/home.scss";

/* lucide-react dropped brand/logo icons (Github, Twitter, etc.)
   from its core export in newer versions, so the GitHub mark is
   rendered as a small inline SVG instead of a lucide import. */
function GithubIcon({ size = 17 }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.05 11.05 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
        </svg>
    );
}

function Home() {
    const canvasRef = useRef(null);
    const heroRef = useRef(null);
    const [scrolled, setScrolled] = useState(false);
    const [expression, setExpression] = useState("HAPPY");
    const [confidence, setConfidence] = useState(82);
    const [activeNav, setActiveNav] = useState("home");

    /* =========================================================
       NAVBAR SCROLL STATE
       - scroll listener is rAF-throttled (was firing on every
         scroll event, which can be dozens of times per frame)
       - section elements are looked up once instead of on
         every scroll tick
    ========================================================= */

    useEffect(() => {
        const sectionIds = ["home", "how-it-works", "technology", "about"];

        const sections = sectionIds
            .map((id) => document.getElementById(id))
            .filter(Boolean);

        let ticking = false;

        const updateScrollState = () => {
            setScrolled(window.scrollY > 40);

            for (const section of sections) {
                const rect = section.getBoundingClientRect();

                if (
                    rect.top <= window.innerHeight * 0.35 &&
                    rect.bottom >= window.innerHeight * 0.35
                ) {
                    setActiveNav(section.id);
                    break;
                }
            }

            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(updateScrollState);
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        updateScrollState();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    /* =========================================================
       HERO MOUSE PARALLAX
    ========================================================= */

    useEffect(() => {
        const hero = heroRef.current;

        if (!hero) return;

        const handleMouseMove = (event) => {
            const rect = hero.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            hero.style.setProperty("--mouse-x", `${x * 18}px`);
            hero.style.setProperty("--mouse-y", `${y * 18}px`);
        };

        const resetMouse = () => {
            hero.style.setProperty("--mouse-x", "0px");
            hero.style.setProperty("--mouse-y", "0px");
        };

        hero.addEventListener("mousemove", handleMouseMove, { passive: true });
        hero.addEventListener("mouseleave", resetMouse, { passive: true });

        return () => {
            hero.removeEventListener("mousemove", handleMouseMove);
            hero.removeEventListener("mouseleave", resetMouse);
        };
    }, []);

    /* =========================================================
       EXPRESSION DEMO
    ========================================================= */

    useEffect(() => {
        const expressions = [
            { name: "HAPPY", confidence: 82 },
            { name: "SURPRISED", confidence: 76 },
            { name: "NEUTRAL", confidence: 91 },
            { name: "SAD", confidence: 68 }
        ];

        let index = 0;

        const interval = setInterval(() => {
            index = (index + 1) % expressions.length;

            setExpression(expressions[index].name);
            setConfidence(expressions[index].confidence);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    /* =========================================================
       FACE LANDMARK CANVAS
       - drawConnections now rejects far-apart pairs with a
         squared-distance check before calling Math.sqrt
       - the rAF loop is stopped via IntersectionObserver once
         the hero scrolls out of view, and resumed when it
         scrolls back in or the tab regains visibility, instead
         of animating the canvas forever in the background
       - resize handling is debounced instead of rebuilding the
         landmark/particle arrays on every resize tick
    ========================================================= */

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        const context = canvas.getContext("2d");

        if (!context) return;

        let animationFrame = null;
        let resizeTimeout = null;
        let width = 0;
        let height = 0;
        let hasFocus = true;
        let isVisible = true;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        const particles = [];
        const landmarks = [];

        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect();

            width = rect.width;
            height = rect.height;

            canvas.width = width * dpr;
            canvas.height = height * dpr;

            context.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const createFace = () => {
            landmarks.length = 0;

            const centerX = width * 0.53;
            const centerY = height * 0.48;

            const scaleX = Math.min(width * 0.29, 230);
            const scaleY = Math.min(height * 0.39, 310);

            /*
             * Face outline
             */
            for (let i = 0; i < 48; i++) {
                const angle = Math.PI * 2 * (i / 48);

                landmarks.push({
                    x: centerX + Math.cos(angle) * scaleX,
                    y: centerY + Math.sin(angle) * scaleY,
                    type: "outline"
                });
            }

            /*
             * Eyes
             */
            const createEye = (eyeX, eyeY) => {
                for (let i = 0; i < 12; i++) {
                    const angle = Math.PI * 2 * (i / 12);

                    landmarks.push({
                        x: eyeX + Math.cos(angle) * 55,
                        y: eyeY + Math.sin(angle) * 17,
                        type: "eye"
                    });
                }
            };

            createEye(centerX - 92, centerY - 62);
            createEye(centerX + 92, centerY - 62);

            /*
             * Nose
             */
            for (let i = 0; i < 10; i++) {
                const t = i / 9;

                landmarks.push({
                    x: centerX + Math.sin(t * Math.PI) * 15,
                    y: centerY - 25 + t * 92,
                    type: "nose"
                });
            }

            /*
             * Mouth
             */
            for (let i = 0; i < 18; i++) {
                const angle = Math.PI * 2 * (i / 18);

                landmarks.push({
                    x: centerX + Math.cos(angle) * 70,
                    y: centerY + 112 + Math.sin(angle) * 22,
                    type: "mouth"
                });
            }
        };

        const createParticles = () => {
            particles.length = 0;

            const amount = window.innerWidth < 768 ? 80 : 150;

            for (let i = 0; i < amount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 1.5 + 0.3,
                    speedX: (Math.random() - 0.5) * 0.25,
                    speedY: (Math.random() - 0.5) * 0.25,
                    alpha: Math.random() * 0.55 + 0.1
                });
            }
        };

        const drawBackgroundParticles = (time) => {
            particles.forEach((particle) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                if (particle.x < 0) particle.x = width;
                if (particle.x > width) particle.x = 0;

                if (particle.y < 0) particle.y = height;
                if (particle.y > height) particle.y = 0;

                const pulse =
                    particle.alpha +
                    Math.sin(time * 0.001 + particle.x) * 0.12;

                context.beginPath();
                context.arc(
                    particle.x,
                    particle.y,
                    particle.radius,
                    0,
                    Math.PI * 2
                );

                context.fillStyle = `rgba(125, 211, 252, ${Math.max(
                    0.05,
                    pulse
                )})`;

                context.fill();
            });
        };

        const drawConnections = (time) => {
            const maxDistance = Math.min(width * 0.13, 105);
            const maxDistanceSq = maxDistance * maxDistance;

            for (let i = 0; i < landmarks.length; i++) {
                const first = landmarks[i];

                for (let j = i + 1; j < landmarks.length; j++) {
                    const second = landmarks[j];

                    const dx = first.x - second.x;
                    const dy = first.y - second.y;

                    const distanceSq = dx * dx + dy * dy;

                    if (distanceSq > maxDistanceSq) continue;

                    const distance = Math.sqrt(distanceSq);

                    const pulse =
                        0.08 +
                        Math.sin(time * 0.0015 + i * 0.5) * 0.04;

                    context.beginPath();
                    context.moveTo(first.x, first.y);
                    context.lineTo(second.x, second.y);

                    context.strokeStyle = `rgba(103, 232, 249, ${Math.max(
                        0.015,
                        pulse * (1 - distance / maxDistance)
                    )})`;

                    context.lineWidth = 0.6;
                    context.stroke();
                }
            }
        };

        const drawFace = (time) => {
            const movementX = Math.sin(time * 0.0007) * 3;
            const movementY = Math.cos(time * 0.0009) * 3;

            landmarks.forEach((point, index) => {
                const x = point.x + movementX;
                const y = point.y + movementY;

                const pulse =
                    1.5 +
                    Math.sin(time * 0.002 + index) * 0.7;

                context.beginPath();
                context.arc(x, y, pulse, 0, Math.PI * 2);

                context.fillStyle = "rgba(165, 243, 252, 0.9)";
                context.shadowBlur = 12;
                context.shadowColor = "rgba(34, 211, 238, 0.8)";
                context.fill();
                context.shadowBlur = 0;
            });
        };

        const drawScanLine = (time) => {
            const scanHeight =
                ((time * 0.06) % (height + 200)) - 100;

            const gradient = context.createLinearGradient(
                0,
                scanHeight - 35,
                0,
                scanHeight + 35
            );

            gradient.addColorStop(
                0,
                "rgba(34, 211, 238, 0)"
            );

            gradient.addColorStop(
                0.5,
                "rgba(103, 232, 249, 0.25)"
            );

            gradient.addColorStop(
                1,
                "rgba(34, 211, 238, 0)"
            );

            context.fillStyle = gradient;

            context.fillRect(
                width * 0.18,
                scanHeight - 35,
                width * 0.7,
                70
            );

            context.beginPath();
            context.moveTo(
                width * 0.18,
                scanHeight
            );

            context.lineTo(
                width * 0.88,
                scanHeight
            );

            context.strokeStyle =
                "rgba(103, 232, 249, 0.35)";

            context.lineWidth = 1;

            context.stroke();
        };

        const animate = (time) => {
            context.clearRect(0, 0, width, height);

            drawBackgroundParticles(time);
            drawConnections(time);
            drawFace(time);
            drawScanLine(time);

            animationFrame = requestAnimationFrame(animate);
        };

        const startAnimation = () => {
            if (animationFrame === null) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        const stopAnimation = () => {
            if (animationFrame !== null) {
                cancelAnimationFrame(animationFrame);
                animationFrame = null;
            }
        };

        const syncAnimationState = () => {
            if (isVisible && hasFocus) {
                startAnimation();
            } else {
                stopAnimation();
            }
        };

        const handleResize = () => {
            clearTimeout(resizeTimeout);

            resizeTimeout = setTimeout(() => {
                resizeCanvas();
                createFace();
                createParticles();
            }, 150);
        };

        const handleVisibilityChange = () => {
            hasFocus = document.visibilityState === "visible";
            syncAnimationState();
        };

        resizeCanvas();
        createFace();
        createParticles();

        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
                syncAnimationState();
            },
            { threshold: 0 }
        );

        observer.observe(canvas);

        window.addEventListener("resize", handleResize);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        startAnimation();

        return () => {
            stopAnimation();
            clearTimeout(resizeTimeout);
            observer.disconnect();
            window.removeEventListener("resize", handleResize);
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
        };
    }, []);

    /* =========================================================
       SMOOTH SCROLL
    ========================================================= */

    const scrollToSection = (id) => {
        document
            .getElementById(id)
            ?.scrollIntoView({
                behavior: "smooth"
            });
    };

    return (
        <main className="moodify-page">
            {/* =====================================================
                NAVBAR
            ===================================================== */}

            <header
                className={`moodify-nav ${
                    scrolled ? "is-scrolled" : ""
                }`}
            >
                <button
                    className="moodify-brand"
                    onClick={() => scrollToSection("home")}
                    aria-label="Go to Moodify home"
                >
                    <span className="brand-mark">
                        <ScanFace size={18} />
                    </span>

                    <span>MOODIFY</span>
                </button>

                <nav className="desktop-nav">
                    <button
                        className={
                            activeNav === "home"
                                ? "active"
                                : ""
                        }
                        onClick={() => scrollToSection("home")}
                    >
                        Home
                    </button>

                    <button
                        className={
                            activeNav === "how-it-works"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            scrollToSection("how-it-works")
                        }
                    >
                        How it works
                    </button>

                    <button
                        className={
                            activeNav === "technology"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            scrollToSection("technology")
                        }
                    >
                        Technology
                    </button>

                    <button
                        className={
                            activeNav === "about"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            scrollToSection("about")
                        }
                    >
                        About
                    </button>
                </nav>

                <div className="nav-auth">
                    <Link to="/login" className="nav-login">
                        Login
                    </Link>

                    <Link to="/register" className="nav-signup">
                        Sign Up
                    </Link>
                </div>

                <button
                    className="nav-cta"
                    onClick={() => scrollToSection("final-cta")}
                >
                    Analyze My Mood
                    <ArrowRight size={15} />
                </button>
            </header>

            {/* =====================================================
                HERO — REDESIGNED
            ===================================================== */}
            <section className="hero" id="home" ref={heroRef}>
                <div className="hero-grid" />
                <div className="hero-noise" />
                <div className="hero-ambient hero-ambient-one" />
                <div className="hero-ambient hero-ambient-two" />

                <div className="hero-topline">
                    <span>01 / COMPUTER VISION</span>
                    <span className="topline-status"><i /> SYSTEM ONLINE</span>
                </div>

                <div className="hero-content">
                    <div className="eyebrow">
                        <span className="eyebrow-line" />
                        <span>MOODIFY / SEE THE SIGNAL</span>
                    </div>

                    <h1 className="hero-title">
                        <span>We read</span>
                        <span className="hero-title-outline">the expression.</span>
                        <span className="hero-title-accent">You feel the difference.</span>
                    </h1>

                    <p className="hero-description">
                        Moodify uses your camera and real-time computer vision to turn visible facial expressions into an instant mood signal.
                    </p>

                    <div className="hero-actions">
                        <button
                            className="primary-button"
                            onClick={() => scrollToSection("final-cta")}
                        >
                            <span>Try Moodify</span>
                            <ArrowRight size={17} />
                        </button>

                        <button
                            className="secondary-button"
                            onClick={() => scrollToSection("how-it-works")}
                        >
                            <span className="secondary-index">02</span>
                            See how it works
                        </button>
                    </div>

                    <div className="hero-proof">
                        <span><Camera size={13} /> CAMERA INPUT</span>
                        <span><ScanFace size={13} /> FACE LANDMARKS</span>
                        <span><Sparkles size={13} /> EXPRESSION SIGNAL</span>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="visual-aura" />
                    <div className="visual-rings">
                        <div className="visual-ring ring-one" />
                        <div className="visual-ring ring-two" />
                        <div className="visual-ring ring-three" />
                    </div>

                    <div className="face-stage"
                        style={{
                            transform: "translate3d(var(--mouse-x), var(--mouse-y), 0)"
                        }}
                    >
                        <div className="face-glow" />
                        <canvas
                            ref={canvasRef}
                            className="face-canvas"
                            aria-label="Animated facial landmark visualization"
                        />
                        <div className="face-center">
                            <div className="center-core" />
                            <span>MF</span>
                        </div>
                    </div>

                    <div className="face-crosshair crosshair-one" />
                    <div className="face-crosshair crosshair-two" />
                    <div className="face-crosshair crosshair-three" />

                    <div className="hero-data data-top">
                        <span className="data-label">FACE SIGNAL</span>
                        <strong>ACTIVE</strong>
                    </div>

                    <div className="hero-data data-left">
                        <span className="data-label">LANDMARKS</span>
                        <strong>478 <small>POINTS</small></strong>
                    </div>

                    <div className="hero-data data-right">
                        <span className="data-label">MODEL</span>
                        <strong>MEDIAPIPE</strong>
                    </div>

                    <div className="hero-expression">
                        <div className="expression-header">
                            <span>DEMO SIGNAL</span>
                            <span><i /> LIVE</span>
                        </div>
                        <div className="expression-value">
                            <Sparkles size={15} />
                            <span>{expression}</span>
                        </div>
                        <div className="expression-meter">
                            <span style={{ width: `${confidence}%` }} />
                        </div>
                        <div className="expression-footer">
                            <span>CONFIDENCE</span>
                            <strong>{confidence}%</strong>
                        </div>
                    </div>

                    <div className="visual-caption">
                        <span>FACIAL LANDMARK FIELD</span>
                        <span>LATENCY &lt; REAL-TIME</span>
                    </div>
                </div>

                <div className="hero-bottomline">
                    <span>EXPRESSIONS ARE SIGNALS</span>
                    <button onClick={() => scrollToSection("why-moodify")} aria-label="Explore Moodify">
                        <span>EXPLORE</span>
                        <ArrowDown size={15} />
                    </button>
                    <span>NOT MIND READING</span>
                </div>
            </section>

            {/* =====================================================
                WHY MOODIFY
            ===================================================== */}

            <section
                className="why-section section"
                id="why-moodify"
            >
                <div className="section-label">
                    <span>01</span>
                    WHY MOODIFY
                </div>

                <div className="why-heading">
                    <h2>
                        Because expressions
                        <span> say more than words.</span>
                    </h2>

                    <p>
                        Humans communicate through facial
                        expressions constantly. Moodify explores
                        what happens when digital interfaces can
                        understand that missing layer of
                        interaction.
                    </p>
                </div>

                <div className="principles">
                    <article className="principle">
                        <span className="principle-number">
                            01
                        </span>

                        <div className="principle-icon">
                            <Eye size={24} />
                        </div>

                        <h3>UNDERSTAND</h3>

                        <p>
                            Detect subtle facial movements and
                            landmark changes in real time.
                        </p>

                        <span className="principle-line" />
                    </article>

                    <article className="principle">
                        <span className="principle-number">
                            02
                        </span>

                        <div className="principle-icon">
                            <Brain size={24} />
                        </div>

                        <h3>INTERPRET</h3>

                        <p>
                            Convert visual signals into
                            recognizable expression categories.
                        </p>

                        <span className="principle-line" />
                    </article>

                    <article className="principle">
                        <span className="principle-number">
                            03
                        </span>

                        <div className="principle-icon">
                            <Zap size={24} />
                        </div>

                        <h3>RESPOND</h3>

                        <p>
                            Build interfaces capable of reacting
                            to the user's visible expression.
                        </p>

                        <span className="principle-line" />
                    </article>
                </div>
            </section>

            {/* =====================================================
                HOW IT WORKS
            ===================================================== */}

            <section
                className="how-section section"
                id="how-it-works"
            >
                <div className="section-label">
                    <span>02</span>
                    HOW IT WORKS
                </div>

                <div className="section-heading">
                    <h2>
                        From camera
                        <span> to expression.</span>
                    </h2>

                    <p>
                        Three layers transform a live camera
                        stream into an estimated facial expression.
                    </p>
                </div>

                <div className="pipeline">
                    <div className="pipeline-line">
                        <span className="data-particle particle-a" />
                        <span className="data-particle particle-b" />
                        <span className="data-particle particle-c" />
                    </div>

                    <article className="pipeline-step">
                        <div className="step-top">
                            <span>01</span>
                            <Camera size={21} />
                        </div>

                        <div className="step-visual camera-visual">
                            <div className="camera-frame">
                                <span />
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>

                        <h3>Your Camera</h3>

                        <p>
                            Moodify receives the live video
                            stream from your webcam.
                        </p>
                    </article>

                    <article className="pipeline-step">
                        <div className="step-top">
                            <span>02</span>
                            <ScanFace size={21} />
                        </div>

                        <div className="step-visual mesh-visual">
                            <div className="mini-face">
                                <i />
                                <i />
                                <i />
                                <i />
                                <i />
                            </div>
                        </div>

                        <h3>Face Landmarker</h3>

                        <p>
                            MediaPipe detects facial landmarks
                            and blendshape signals.
                        </p>
                    </article>

                    <article className="pipeline-step">
                        <div className="step-top">
                            <span>03</span>
                            <Sparkles size={21} />
                        </div>

                        <div className="step-visual result-visual">
                            <strong>{expression}</strong>
                            <span>ESTIMATED EXPRESSION</span>
                        </div>

                        <h3>Expression Engine</h3>

                        <p>
                            Moodify analyzes those signals and
                            estimates the current expression.
                        </p>
                    </article>
                </div>
            </section>

            {/* =====================================================
                TECHNOLOGY
            ===================================================== */}

            <section
                className="technology-section section"
                id="technology"
            >
                <div className="section-label">
                    <span>03</span>
                    TECHNOLOGY
                </div>

                <div className="technology-layout">
                    <div className="technology-copy">
                        <h2>
                            Intelligence,
                            <span> visualized.</span>
                        </h2>

                        <p>
                            Moodify sits at the intersection of
                            React, computer vision and real-time
                            facial analysis.
                        </p>

                        <div className="tech-status">
                            <span className="status-pulse" />
                            SYSTEM READY
                        </div>
                    </div>

                    <div className="technology-constellation">
                        <div className="constellation-grid" />

                        <div className="constellation-core">
                            <ScanFace size={28} />
                            <span>MOODIFY</span>
                        </div>

                        <div className="constellation-node node-react">
                            <span>REACT</span>
                        </div>

                        <div className="constellation-node node-mediapipe">
                            <span>MEDIAPIPE</span>
                        </div>

                        <div className="constellation-node node-face">
                            <span>FACE LANDMARKER</span>
                        </div>

                        <div className="constellation-node node-blend">
                            <span>BLENDSHAPES</span>
                        </div>

                        <div className="constellation-node node-cv">
                            <span>COMPUTER VISION</span>
                        </div>

                        <div className="constellation-node node-realtime">
                            <span>REAL-TIME</span>
                        </div>

                        <div className="connection connection-one" />
                        <div className="connection connection-two" />
                        <div className="connection connection-three" />
                        <div className="connection connection-four" />
                        <div className="connection connection-five" />
                        <div className="connection connection-six" />
                    </div>
                </div>
            </section>

            {/* =====================================================
                TRUST / PRIVACY
            ===================================================== */}

            <section
                className="trust-section section"
                id="about"
            >
                <div className="trust-glow" />

                <div className="section-label">
                    <span>04</span>
                    TRUST & CONTEXT
                </div>

                <div className="trust-content">
                    <div className="trust-icon">
                        <Lock size={23} />
                    </div>

                    <h2>
                        Your face
                        <span> is yours.</span>
                    </h2>

                    <p>
                        Facial expressions are signals, not
                        absolute truth. Moodify is an experimental
                        exploration of how computer vision can
                        estimate visible expressions — not a
                        definitive measurement of someone's
                        internal emotional state.
                    </p>

                    <div className="trust-points">
                        <span>
                            <i />
                            Expression ≠ emotion
                        </span>

                        <span>
                            <i />
                            Signals ≠ certainty
                        </span>

                        <span>
                            <i />
                            Technology ≠ mind reading
                        </span>
                    </div>
                </div>
            </section>

            {/* =====================================================
                FINAL CTA
            ===================================================== */}

            <section
                className="final-cta"
                id="final-cta"
            >
                <div className="final-grid" />

                <div className="final-face-lines">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                </div>

                <div className="final-content">
                    <span className="final-eyebrow">
                        THE NEXT INTERACTION
                    </span>

                    <h2>
                        Ready to see what
                        <span> your expression says?</span>
                    </h2>

                    <p>
                        Step into the experiment.
                        Turn on your camera and let Moodify
                        interpret the signals.
                    </p>

                    <button
                        className="final-button"
                        onClick={() =>
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            })
                        }
                    >
                        Try Moodify
                        <ArrowRight size={19} />
                    </button>
                </div>
            </section>

            {/* =====================================================
                FOOTER
            ===================================================== */}

            <footer className="moodify-footer">
                <div className="footer-brand">
                    <span className="brand-mark">
                        <ScanFace size={16} />
                    </span>

                    <strong>MOODIFY</strong>
                </div>

                <p>
                    Exploring the intersection of computer
                    vision and human expression.
                </p>

                <div className="footer-right">
                    <span>© 2026 MOODIFY</span>

                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Moodify GitHub"
                    >
                        <GithubIcon size={17} />
                    </a>
                </div>
            </footer>
        </main>
    );
}

export default Home;
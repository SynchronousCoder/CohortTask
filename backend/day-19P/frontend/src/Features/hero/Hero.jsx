import React, { Suspense, useRef } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import "./Hero.scss";

/* =========================================================
   ATMOSPHERIC PARTICLES
========================================================= */

function Atmosphere() {
  const pointsRef = useRef();

  const particles = React.useMemo(() => {
    const count = 900;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y =
      state.clock.elapsedTime * 0.015;

    pointsRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.1) * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#ffffff"
        size={0.012}
        transparent
        opacity={0.28}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* =========================================================
   SOCIAL CORE
========================================================= */

function SocialCore() {
  const groupRef = useRef();
  const coreRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;

    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    /*
      VERY subtle mouse movement.

      The whole composition moves,
      instead of the sphere behaving
      like a rotating product.
    */

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouseX * 0.22,
      0.035
    );

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouseY * 0.14,
      0.035
    );

    if (coreRef.current) {
      coreRef.current.rotation.y += 0.0015;
      coreRef.current.rotation.x += 0.0007;
    }

    if (ringRef.current) {
      ringRef.current.rotation.y -= 0.0008;
      ringRef.current.rotation.z += 0.0004;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[1.35, -0.05, -0.5]}
    >

      {/* =================================================
          ATMOSPHERIC GLOW
      ================================================= */}

      <mesh scale={2.35}>
        <sphereGeometry args={[1, 64, 64]} />

        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.025}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* =================================================
          MAIN CORE
      ================================================= */}

      <Float
        speed={0.7}
        rotationIntensity={0.12}
        floatIntensity={0.35}
      >

        <mesh ref={coreRef} scale={1.95}>

          <icosahedronGeometry args={[1, 5]} />

          <meshPhysicalMaterial
            color="#030303"
            metalness={0.85}
            roughness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.12}

            /*
              Much less "product render".
              More integrated into dark environment.
            */
            transparent
            opacity={0.92}

            emissive="#111111"
            emissiveIntensity={0.12}
          />

        </mesh>

        {/* subtle outer geometry */}

        <mesh scale={1.015}>

          <icosahedronGeometry args={[1, 3]} />

          <meshBasicMaterial
            color="#ffffff"
            wireframe
            transparent
            opacity={0.075}
            depthWrite={false}
          />

        </mesh>

      </Float>

      {/* =================================================
          ORBITAL STRUCTURE
      ================================================= */}

      <group ref={ringRef}>

        <mesh rotation={[Math.PI / 2.7, 0.2, 0.4]}>

          <torusGeometry
            args={[2.08, 0.006, 8, 160]}
          />

          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.18}
          />

        </mesh>

        <mesh rotation={[0.5, Math.PI / 2.5, 0]}>

          <torusGeometry
            args={[2.12, 0.004, 8, 160]}
          />

          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.1}
          />

        </mesh>

      </group>

      {/* =================================================
          CONNECTION NODES
      ================================================= */}

      <mesh position={[2.0, 0.8, 0.15]}>
        <sphereGeometry args={[0.035, 16, 16]} />

        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.8}
        />
      </mesh>

      <mesh position={[-1.8, -0.6, 0.2]}>
        <sphereGeometry args={[0.025, 16, 16]} />

        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.6}
        />
      </mesh>

      <mesh position={[0.6, 2, -0.3]}>
        <sphereGeometry args={[0.018, 16, 16]} />

        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.7}
        />
      </mesh>

    </group>
  );
}

/* =========================================================
   3D WORLD
========================================================= */

function Scene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 6],
        fov: 45,
      }}
      dpr={[1, 1.7]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
    >

      <Suspense fallback={null}>

        <ambientLight intensity={0.18} />

        <directionalLight
          position={[3, 3, 5]}
          intensity={1.8}
        />

        <pointLight
          position={[-3, 1, 2]}
          intensity={1.2}
        />

        <Atmosphere />

        <SocialCore />

      </Suspense>

    </Canvas>
  );
}

/* =========================================================
   HOME
========================================================= */

const Home = () => {
  return (
    <main className="home">

      {/* atmospheric CSS layers */}

      <div className="home__ambient" />
      <div className="home__noise" />

      {/* =================================================
          3D WORLD

          IMPORTANT:
          This is now a full-screen visual layer.
          It isn't "inside a right-side box".
      ================================================= */}

      <div className="home__world">
        <Scene />
      </div>

      {/* =================================================
          NAVIGATION
      ================================================= */}

      <nav className="home__nav">

        <Link to="/" className="home__logo">
          NØVA<span>.</span>
        </Link>

        <div className="home__nav-links">
          <a href="#explore">Explore</a>
          <a href="#community">Community</a>
          <a href="#about">About</a>
        </div>

        <div className="home__actions">

          <Link
            to="/login"
            className="home__login"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="home__signup"
          >
            Sign Up
          </Link>

        </div>

      </nav>

      {/* =================================================
          HERO CONTENT
      ================================================= */}

      <section className="home__hero">

        <div className="home__content">

          <div className="home__eyebrow">
            <span />
            A NEW KIND OF SOCIAL
          </div>

          <h1>
            CONNECT.
            <br />
            CREATE.
            <br />
            <em>EXIST.</em>
          </h1>

          <p>
            A digital space built for people,
            ideas and everything worth sharing.
          </p>

          <div className="home__cta-row">

            <Link
              to="/signup"
              className="home__cta"
            >
              <span>Enter the world</span>

              <span className="home__cta-arrow">
                ↗
              </span>
            </Link>

            <span className="home__hint">
              Scroll to explore
            </span>

          </div>

        </div>

        {/* =================================================
            SOCIAL UI — now visually integrated
        ================================================= */}

        <div className="home__floating home__floating--one">

          <span className="avatar">
            A
          </span>

          <div>
            <strong>@aryan</strong>
            <small>just joined</small>
          </div>

        </div>

        <div className="home__floating home__floating--two">

          <span>✦</span>

          <strong>2.4K</strong>

          <small>
            connections
          </small>

        </div>

        <div className="home__floating home__floating--three">

          <span className="pulse" />

          <small>
            people are online
          </small>

        </div>

      </section>

      {/* =================================================
          BOTTOM
      ================================================= */}

      <div className="home__bottom">

        <div>
          <span>01</span>
          <p>Discover people</p>
        </div>

        <div>
          <span>02</span>
          <p>Share your world</p>
        </div>

        <div>
          <span>03</span>
          <p>Build connections</p>
        </div>


      </div>

    </main>
  );
};

export default Home;
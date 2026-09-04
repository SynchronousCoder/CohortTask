import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import "../styles/style.scss";

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
    let mounted = true;

    async function start() {
      if (!mounted) return;

      await init({
        landmarkerRef,
        videoRef,
        streamRef,
      });
    }

    start();

    return () => {
      mounted = false;

      if (landmarkerRef.current) {
        landmarkerRef.current.close();
        landmarkerRef.current = null;
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());

        streamRef.current = null;
      }
    };
  }, []);

  function handleClick() {
    const expression = detect({
      landmarkerRef,
      videoRef,
      setExpression,
    });
    onClick(expression);
  }

  return (
    <div className="face-expression">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{
          width: "400px",
          borderRadius: "12px",
        }}
      />

      <h2>{expression}</h2>

      <button onClick={handleClick}>Detect expression</button>
    </div>
  );
}

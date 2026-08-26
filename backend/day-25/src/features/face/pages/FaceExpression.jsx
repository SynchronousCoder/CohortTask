import { useEffect, useRef, useState } from "react";
import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const animationRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");

  let stream;

  async function initialize() {
    try {
      // 1. Load MediaPipe vision files
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      // 2. Create Face Landmarker
      const landmarker = await FaceLandmarker.createFromOptions(
        vision,
        {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
          },

          outputFaceBlendshapes: true,
          runningMode: "VIDEO",
          numFaces: 1,
        }
      );

      landmarkerRef.current = landmarker;

      // 3. Access webcam
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      videoRef.current.srcObject = stream;

      await videoRef.current.play();

      // 4. Start detection
      detect();
    } catch (error) {
      console.error("Face detection initialization failed:", error);
      setExpression("Camera / MediaPipe Error");
    }
  }

  function detect() {
    if (!landmarkerRef.current || !videoRef.current) {
      return;
    }

    const video = videoRef.current;

    // Don't detect before video has enough data
    if (video.readyState < 2) {
      animationRef.current = requestAnimationFrame(detect);
      return;
    }

    const results = landmarkerRef.current.detectForVideo(
      video,
      performance.now()
    );

    if (results.faceBlendshapes?.length > 0) {
      const blendshapes =
        results.faceBlendshapes[0].categories;

      // Helper function
      const getScore = (name) => {
        return (
          blendshapes.find(
            (blendshape) =>
              blendshape.categoryName === name
          )?.score || 0
        );
      };

      // Get required scores
      const smileLeft = getScore("mouthSmileLeft");
      const smileRight = getScore("mouthSmileRight");

      const jawOpen = getScore("jawOpen");
      const browUp = getScore("browInnerUp");

      const frownLeft = getScore("mouthFrownLeft");
      const frownRight = getScore("mouthFrownRight");

      console.log(getScore("mouthFrownLeft"),  getScore("mouthFrownRight"))
      // Our own expression rules
      let currentExpression = "Neutral 😐";

      if (
        smileLeft > 0.5 &&
        smileRight > 0.5
      ) {
        currentExpression = "Happy 😄";
      } else if (
        jawOpen > 0.1 &&
        browUp > 0.1
      ) {
        currentExpression = "Surprised 😲";
      } else if (
        frownLeft > 0.01 &&
        frownRight > 0.01
      ) {
        currentExpression = "Sad 😢";
      }

      setExpression(currentExpression);
    } else {
      setExpression("No face detected");
    }

    animationRef.current =
      requestAnimationFrame(detect);
  }

  useEffect(() => {
    initialize();
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }

      if (landmarkerRef.current) {
        landmarkerRef.current.close();
        landmarkerRef.current = null;
      }
    };
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: "400px",
          borderRadius: "12px",
        }}
      />

      <h2>{expression}</h2>
      <button onClick={detect} >Detect expression</button>
    </div>
  );
}
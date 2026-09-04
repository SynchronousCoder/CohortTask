import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const init = async ({ landmarkerRef, videoRef, streamRef }) => {
  try {
    if (!videoRef.current) {
      console.error("Video element is not available");
      return;
    }

    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
    );

    landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
      },

      outputFaceBlendshapes: true,
      runningMode: "VIDEO",
      numFaces: 1,
    });

    streamRef.current = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    if (!videoRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());

      return;
    }

    videoRef.current.srcObject = streamRef.current;

    await new Promise((resolve) => {
      if (videoRef.current.readyState >= 1) {
        resolve();
      } else {
        videoRef.current.onloadedmetadata = resolve;
      }
    });

    try {
      await videoRef.current.play();
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Video play failed:", error);
      }
    }
  } catch (error) {
    console.error("MediaPipe initialization failed:", error);
  }
};

export function detect({ videoRef, landmarkerRef, setExpression }) {
  if (!landmarkerRef.current || !videoRef.current) {
    return;
  }

  const video = videoRef.current;

  if (video.readyState < 2) {
    return;
  }

  const results = landmarkerRef.current.detectForVideo(
    video,
    performance.now(),
  );

  if (results.faceBlendshapes?.length > 0) {
    const blendshapes = results.faceBlendshapes[0].categories;

    const getScore = (name) => {
      return (
        blendshapes.find((blendshape) => blendshape.categoryName === name)
          ?.score || 0
      );
    };

    const smileLeft = getScore("mouthSmileLeft");
    const smileRight = getScore("mouthSmileRight");

    const jawOpen = getScore("jawOpen");
    const browUp = getScore("browInnerUp");

    const frownLeft = getScore("mouthFrownLeft");
    const frownRight = getScore("mouthFrownRight");

    let currentExpression = "neutral";

    if (smileLeft > 0.5 && smileRight > 0.5) {
      currentExpression = "happy";
    } else if (jawOpen > 0.1 && browUp > 0.1) {
      currentExpression = "surprised";
    } else if (frownLeft > 0.01 && frownRight > 0.01) {
      currentExpression = "sad";
    }

    setExpression(currentExpression);
    return currentExpression;
  } else {
    setExpression("No face detected");
  }
}

import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

export const init = async ({ landmarkerRef, videoRef, streamRef }) => {
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    landmarkerRef.current = await FaceLandmarker.createFromOptions(
        vision,
        {
            baseOptions: {
                modelAssetPath:
                    "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task"
            },
            outputFaceBlendshapes: true,
            runningMode: "VIDEO",
            numFaces: 1
        }
    );

    streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = streamRef.current;
    await videoRef.current.play();
};

export function detect({videoRef,landmarkerRef, setExpression}) {
  if (!landmarkerRef.current || !videoRef.current) {
    return;
  }

  const video = videoRef.current;

  // Don't detect before video has enough data
  if (video.readyState < 2) {
    return;
  }

  const results = landmarkerRef.current.detectForVideo(
    video,
    performance.now(),
  );

  if (results.faceBlendshapes?.length > 0) {
    const blendshapes = results.faceBlendshapes[0].categories;

    // Helper function
    const getScore = (name) => {
      return (
        blendshapes.find((blendshape) => blendshape.categoryName === name)
          ?.score || 0
      );
    };

    // Get required scores
    const smileLeft = getScore("mouthSmileLeft");
    const smileRight = getScore("mouthSmileRight");

    const jawOpen = getScore("jawOpen");
    const browUp = getScore("browInnerUp");

    const frownLeft = getScore("mouthFrownLeft");
    const frownRight = getScore("mouthFrownRight");

    console.log(getScore("mouthFrownLeft"), getScore("mouthFrownRight"));
    // Our own expression rules
    let currentExpression = "Neutral 😐";

    if (smileLeft > 0.5 && smileRight > 0.5) {
      currentExpression = "Happy 😄";
    } else if (jawOpen > 0.1 && browUp > 0.1) {
      currentExpression = "Surprised 😲";
    } else if (frownLeft > 0.01 && frownRight > 0.01) {
      currentExpression = "Sad 😢";
    }

    setExpression(currentExpression);
  } else {
    setExpression("No face detected");
  }
}
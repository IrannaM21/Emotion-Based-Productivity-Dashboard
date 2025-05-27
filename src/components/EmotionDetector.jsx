import React, { useRef, useEffect, useState, useContext } from "react";
import * as faceapi from "face-api.js";
import { EmotionContext } from "../context/EmotionContext";

const VIDEO_WIDTH = 720;
const VIDEO_HEIGHT = 560;

const EmotionDetector = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalIdRef = useRef(null); // To store interval ID

  const [emotion, setEmotion] = useState("");
  const { setEmotion: setGlobalEmotion } = useContext(EmotionContext);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
      ]);
      startVideo();
    };

    loadModels();

    // Cleanup function to stop stream when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startDetection = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    intervalIdRef.current = setInterval(async () => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;

      const displaySize = { width: VIDEO_WIDTH, height: VIDEO_HEIGHT };
      faceapi.matchDimensions(canvas, displaySize);

      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      const resized = faceapi.resizeResults(detections, displaySize);
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      faceapi.draw.drawDetections(canvas, resized);
      faceapi.draw.drawFaceExpressions(canvas, resized);

      if (detections.length > 0) {
        const expressions = detections[0].expressions;
        const maxEmotion = Object.keys(expressions).reduce((a, b) =>
          expressions[a] > expressions[b] ? a : b
        );
        setEmotion(maxEmotion);
        setGlobalEmotion(maxEmotion);
      }
    }, 500);
  };

  // Clear interval on component unmount
  useEffect(() => {
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  const getEmoji = (emotion) => {
    switch (emotion) {
      case "happy": return "😄";
      case "sad": return "😢";
      case "angry": return "😠";
      case "surprised": return "😲";
      case "neutral": return "😐";
      default: return "";
    }
  };

  return (
    <div style={{ position: "relative", display: "inline-block", textAlign: "center" }}>
      <video
        ref={videoRef}
        autoPlay
        muted
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        style={{ border: "2px solid black", borderRadius: "10px" }}
        onPlay={startDetection}  // Start detection when video plays
      />
      <canvas
        ref={canvasRef}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 2
        }}
      />
      {emotion && (
        <div style={{
          marginTop: "10px",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#333"
        }}>
          Detected Emotion: <span style={{ color: "#007bff" }}>
            {getEmoji(emotion)} {emotion.toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
};

export default EmotionDetector;

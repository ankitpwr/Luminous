import { useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let animationId: number;
    let stream: MediaStream | null;
    async function startCamera() {
      stream = await navigator.mediaDevices.getUserMedia({ video: true }); // Asks browser for camera access and Get camera stream
      if (!videoRef.current || !canvasRef.current) return;
      videoRef.current.srcObject = stream; //Attach stream to video
      await videoRef.current.play();

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d")!;
      canvas.width = 1200;
      canvas.height = 800;
      async function drawFrame() {
        ctx.drawImage(videoRef.current!, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let grayscale = [];
        for (let i = 0; i < data.length; i += 4) {
          let r = data[i];
          let g = data[i + 1];
          let b = data[i + 2];
          let gray = 0.299 * r + 0.587 * g + 0.114 * b;

          data[i] = gray; // R
          data[i + 1] = gray; // G
          data[i + 2] = gray; // B
        }
        ctx.putImageData(imageData, 0, 0);
        animationId = requestAnimationFrame(drawFrame);
      }
      drawFrame();
    }
    startCamera();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, []);
  return (
    <div className="bg-black w-screen h-screen">
      <p className="text-2xl"> hello world</p>
      <canvas ref={canvasRef} />
      <video ref={videoRef} muted playsInline style={{ display: "none" }} />
    </div>
  );
}

export default App;

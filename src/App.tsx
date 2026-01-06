import { useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  async function streamVideo() {
    if (
      navigator.mediaDevices &&
      (await navigator.mediaDevices.getUserMedia({ video: true }))
    ) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      });
    }
  }
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    streamVideo();
  }, []);
  return (
    <div className="bg-black w-screen h-screen">
      <p className="text-2xl"> hello world</p>
      <canvas
        ref={canvasRef}
        height={500}
        width={500}
        className="bg-amber-300"
      />
      <video ref={videoRef} height={500} width={500} />
    </div>
  );
}

export default App;

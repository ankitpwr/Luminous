import { useEffect, useRef, useState } from "react";

import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const asciiChar = [
      "@",
      "%",
      "#",
      "*",
      "+",
      "=",
      ":",
      ",",
      "-",
      ".",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
    ];
    let animationId: number;
    let stream: MediaStream | null;
    async function startCamera() {
      stream = await navigator.mediaDevices.getUserMedia({ video: true }); // Asking browser for camera access and Get camera stream
      if (!videoRef.current || !canvasRef.current) return;
      videoRef.current.srcObject = stream; //Attach stream to video
      await videoRef.current.play();

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d")!;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      async function drawFrame() {
        ctx.drawImage(videoRef.current!, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        //grayscale logic
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

        let asciiImage = [];
        let blockHeigth = 8;
        let blockWidth = 10;

        for (let i = 0; i < imageData.height; i += blockHeigth) {
          let row = "";

          for (let j = 0; j < imageData.width; j += blockWidth) {
            let sum = 0;
            let count = 0;

            for (let x = 0; x < blockHeigth; x++) {
              for (let y = 0; y < blockWidth; y++) {
                const px = j + y;
                const py = i + x;

                if (px >= canvas.width || py >= canvas.height) continue;

                const index = (py * canvas.width + px) * 4;
                sum += data[index]; // grayscale value (R channel)
                count++;
              }
            }
            const avg = sum / count;
            const charIndex = Math.floor((avg / 255) * (asciiChar.length - 1));
            row += asciiChar[charIndex];
          }
          asciiImage.push(row);
        }

        // ctx.putImageData(imageData, 0, 0);
        preRef.current!.textContent = asciiImage.join("\n");
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
    <div className=" bg-black w-screen h-screen ">
      <canvas ref={canvasRef} hidden />
      <video ref={videoRef} muted playsInline style={{ display: "none" }} />
      <pre
        className="leading-2 tracking-normal text-gray-700 text-lg w-screen h-screen"
        ref={preRef}
      >
        {" "}
      </pre>

      <Button
        variant="secondary"
        size="lg"
        className="
    fixed left-1/2 -translate-x-1/2 bottom-8 
    w-24 h-24 rounded-full bg-transparent 
    border-[3px] border-white 
    hover:bg-transparent transition-transform active:scale-95
  "
      >
        <div
          className="
      w-full h-full 
      bg-white rounded-full 
      shadow-md
    "
        />
      </Button>
    </div>
  );
}

export default App;

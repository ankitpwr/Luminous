import { useEffect, useRef, useState } from "react";

import "./App.css";
import { Button } from "./components/ui/button";
import NavBar from "./components/navBar";
import { RefreshCcw } from "lucide-react";
import Menu from "./components/menu";
import useSettingStore from "./store/setting-store";
import SideBar from "./components/sideBar";
import { downScaleGrayscaleImage, grayscaleValue } from "./lib/grayscale";
import { image } from "motion/react-m";
import { downScaleColorImage } from "./lib/colorImage";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const asciiCanvasRef = useRef<HTMLCanvasElement>(null);
  const { sidebar, color, theme, colorTheme, setTheme } = useSettingStore();
  const { fontSize, letterSpacing, lineHeight, contrast } = useSettingStore();
  const asciiChar = theme;

  // prettier-ignore

  function handleFlip() {

    setTheme(theme.reverse());
  }

  function captureImage() {
    console.log("capture called 1");

    if (!preRef.current) return;

    const newCanvas = document.createElement("canvas");
    const newctx = newCanvas.getContext("2d");
    if (!newctx) return;
    const lines = preRef.current.textContent.replace(/\r\n/g, "\n").split("\n");
    const { width: charWidth, height: charHeight } = measureCharBox();
    const cols = Math.max(...lines.map((l) => l.length));
    const rows = lines.length;
    newCanvas.height = rows * charHeight;
    newCanvas.width = cols * charWidth;
    newctx!.fillStyle = "black";
    newctx?.fillRect(0, 0, newCanvas.width, newCanvas.height);

    newctx.font = `${fontSize}px monospace`;
    newctx.textBaseline = "top";
    newctx.fillStyle = `${color}`;

    lines.forEach((line, rowIndex) => {
      let x = 0;
      const y = rowIndex * charHeight;
      for (let i = 0; i < line.length; i++) {
        newctx.fillText(line[i], x, y);
        x += charWidth;
      }
    });

    const dataUrl = newCanvas.toDataURL("image/png");
    console.log(dataUrl);
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `luminous-ascii${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function measureCharBox() {
    if (!preRef.current) return { width: 7, height: 12 };
    const span = document.createElement("span");
    span.textContent = "@";
    span.style.fontFamily = "monospace";
    span.style.fontSize = `${fontSize}px`;
    span.style.letterSpacing = `${letterSpacing}px`;
    span.style.lineHeight = `${lineHeight}px`;
    span.style.position = "absolute";
    span.style.visibility = "hidden";
    document.body.appendChild(span);
    const rect = span.getBoundingClientRect();
    document.body.removeChild(span);

    return { width: Math.floor(rect.width), height: Math.floor(rect.height) };
  }
  useEffect(() => {
    let animationId: number;
    let stream: MediaStream | null;
    async function startCamera() {
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      }); // Asking browser for camera access and Get camera stream
      if (!videoRef.current || !canvasRef.current) return;
      videoRef.current.srcObject = stream; //Attach stream to video
      await videoRef.current.play();

      const canvas = canvasRef.current;
      const asciiCanvas = asciiCanvasRef.current;

      const ctx = canvas.getContext("2d")!;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      async function drawFrame() {
        ctx.drawImage(videoRef.current!, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        //grayscale logic
        let data = imageData.data;
        const { width: charW, height: charH } = measureCharBox();
        const blockHeight = charH;
        const blockWidth = charW;
        if (!colorTheme) {
          // active for grayscale image
          data = grayscaleValue(data, contrast);
          const asciiImage = downScaleGrayscaleImage(
            imageData,
            blockHeight,
            blockWidth,
            asciiChar,
            data,
            canvas,
          );
          preRef.current!.textContent = asciiImage.join("\n");
        } else {
          if (asciiCanvas) {
            downScaleColorImage(
              imageData,
              blockHeight,
              blockWidth,
              asciiChar,
              data,
              canvas,
              asciiCanvas,
              fontSize,
            );
          }
        }

        animationId = requestAnimationFrame(drawFrame);
      }
      drawFrame();
    }
    startCamera();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, [asciiChar, fontSize, lineHeight, letterSpacing, contrast, color, theme]);
  return (
    <div className=" bg-black w-screen h-screen overflow-hidden">
      <NavBar />
      <canvas ref={canvasRef} hidden />
      {colorTheme == true ? (
        <canvas ref={asciiCanvasRef} />
      ) : (
        <pre
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: `${lineHeight}px`,
            letterSpacing: `${letterSpacing}px`,
            color: `${color}`,
          }}
          className={`font-mono  w-screen h-screen`}
          ref={preRef}
        >
          {" "}
        </pre>
      )}
      <video ref={videoRef} muted playsInline style={{ display: "none" }} />
      <div
        onClick={handleFlip}
        className={`bg-black w-12 h-12 fixed bottom-4 left-[42%]  rounded-full flex items-center justify-center border border-[#988be9] cursor-pointer hover:scale-110 duration-150 ease-linear`}
      >
        <RefreshCcw size="24" color="white" />
      </div>

      <div className="fixed left-1/2  bottom-4   -translate-x-1/2   flex items-center justify-center gap-8 overflow-hidden">
        <Button
          onClick={captureImage}
          variant="secondary"
          size="lg"
          className=" cursor-pointer
    w-24 h-24 rounded-full bg-transparent 
    border-[3px] border-white 
    p-2 hover:bg-transparent transition-transform active:scale-95 
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

      <Menu />
      {sidebar && <SideBar />}
    </div>
  );
}

export default App;

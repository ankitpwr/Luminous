import "./App.css";
import { useEffect, useMemo, useRef, useState } from "react";
import NavBar from "./components/navBar";
import Menu from "./components/menu";
import useSettingStore from "./store/setting-store";
import SideBar from "./components/sideBar";
import { calculateGrayscaleValue, renderAsciiGrayscale } from "./lib/grayscale";
import { downScaleColorImage } from "./lib/colorImage";
import { measureCharBox } from "./lib/measureCharBox";
import ActionPanel from "./components/actionPanel";
import Timer from "./components/timer";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const asciiCanvasRef = useRef<HTMLCanvasElement>(null);
  const { color, theme, colorTheme } = useSettingStore();
  const { video, startVideoRecording, sidebar } = useSettingStore();
  const { fontSize, letterSpacing, lineHeight, contrast, brightness } =
    useSettingStore();
  const { cameraReady, setCameraReady } = useSettingStore();
  const charDimension = useMemo(
    () => measureCharBox(fontSize, letterSpacing, lineHeight),
    [fontSize],
  );
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    async function startCamera() {
      try {
        if (!videoRef.current) return;
        streamRef.current = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: { exact: ["user"] },
          },
        });
        videoRef.current.srcObject = streamRef.current; //Attach stream to video
        await videoRef.current.play();

        setCameraReady(true);
      } catch (err) {
        console.log(err);
      }
    }
    startCamera();

    return () => {
      if (streamRef.current)
        streamRef.current.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => {
    let animationId: number;

    async function startCanvas() {
      if (
        !videoRef.current ||
        !canvasRef.current ||
        !asciiCanvasRef.current ||
        !streamRef.current
      ) {
        console.log(`camera state is `, cameraReady);
        return;
      }

      const dpr = window.devicePixelRatio || 1;

      const canvas = canvasRef.current;
      const asciiCanvas = asciiCanvasRef.current;
      const ctx = canvas.getContext("2d")!;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      const { width: charW, height: charH } = charDimension; // block height and block width

      const cols = Math.floor(window.innerWidth / charW);
      const rows = Math.floor(window.innerHeight / charH);
      const tinyCanvas = document.createElement("canvas");
      const tinyCtx = tinyCanvas.getContext("2d");
      asciiCanvas.width = Math.floor(cols * charW * dpr);
      asciiCanvas.height = Math.floor(rows * charH * dpr);

      asciiCanvas.style.width = `${window.innerWidth}px`;
      asciiCanvas.style.height = `${window.innerHeight}px`;
      asciiCanvas.style.display = "block";

      tinyCanvas.width = cols;
      tinyCanvas.height = rows;

      ///////////////////////////////////////////////////////////////////////////////////////

      async function drawFrame() {
        tinyCtx?.drawImage(
          videoRef.current!,
          0,
          0,
          tinyCanvas.width,
          tinyCanvas.height,
        );
        const imageData = tinyCtx!.getImageData(
          0,
          0,
          tinyCanvas.width,
          tinyCanvas.height,
        );
        // ctx.drawImage(videoRef.current!, 0, 0, canvas.width, canvas.height);
        // const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        if (!colorTheme && asciiCanvas) {
          calculateGrayscaleValue(imageData.data, contrast, brightness);
          renderAsciiGrayscale(
            imageData,
            charH,
            charW,
            theme,
            asciiCanvas,
            fontSize,
            color,
            dpr,
          );
        } else if (colorTheme && asciiCanvas) {
          downScaleColorImage(
            imageData,
            charH,
            charW,
            theme,
            asciiCanvas,
            fontSize,
            contrast,
            brightness,
            dpr,
          );
        }

        animationId = requestAnimationFrame(drawFrame);
      }
      drawFrame();
    }
    startCanvas();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      console.log("useEffect is unmounted");
    };
  }, [fontSize, contrast, color, theme, colorTheme, brightness, cameraReady]);
  return (
    <div className=" bg-black w-screen h-screen overflow-hidden">
      <div className="fixed left-0 top-0 flex w-[100%] justify-between  px-4 py-4 ">
        <NavBar />
        <Menu />
      </div>

      <ActionPanel asciiCanvasRef={asciiCanvasRef} />
      <video ref={videoRef} muted playsInline style={{ display: "none" }} />
      <canvas ref={canvasRef} hidden />
      <canvas ref={asciiCanvasRef} />

      {sidebar && <SideBar />}
      {video && startVideoRecording && <Timer />}
    </div>
  );
}

export default App;

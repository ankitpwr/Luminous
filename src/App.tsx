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

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const asciiCanvasRef = useRef<HTMLCanvasElement>(null);
  const { sidebar, color, theme, colorTheme } = useSettingStore();
  const { fontSize, letterSpacing, lineHeight, contrast, brightness } =
    useSettingStore();
  const charDimension = useMemo(
    () => measureCharBox(fontSize, letterSpacing, lineHeight),
    [fontSize],
  );
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraRedy, setCameraReady] = useState(false);

  useEffect(() => {
    async function startCamera() {
      try {
        if (!videoRef.current) return;
        streamRef.current = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: "user",
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
        console.log(`camera state is `, cameraRedy);
        return;
      }

      const canvas = canvasRef.current;
      const asciiCanvas = asciiCanvasRef.current;

      const ctx = canvas.getContext("2d")!;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      console.log("canvas width and height ", canvas.width, canvas.height);

      async function drawFrame() {
        ctx.drawImage(videoRef.current!, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        let data = imageData.data;
        const { width: charW, height: charH } = charDimension;
        const blockHeight = charH;
        const blockWidth = charW;
        if (!colorTheme && asciiCanvas) {
          data = calculateGrayscaleValue(data, contrast, brightness);
          renderAsciiGrayscale(
            imageData,
            blockHeight,
            blockWidth,
            theme,
            data,
            canvas,
            asciiCanvas,
            fontSize,
            color,
          );
        } else if (colorTheme && asciiCanvas) {
          downScaleColorImage(
            imageData,
            blockHeight,
            blockWidth,
            theme,
            data,
            canvas,
            asciiCanvas,
            fontSize,
            contrast,
            brightness,
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
  }, [fontSize, contrast, color, theme, colorTheme, brightness, cameraRedy]);
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
    </div>
  );
}

export default App;

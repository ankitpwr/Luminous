import { useEffect, useRef, useState } from "react";

import "./App.css";
import { Button } from "./components/ui/button";
import NavBar from "./components/navBar";
import { RefreshCcw } from "lucide-react";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  // prettier-ignore
  const [asciiChar, setAsciiChars] = useState<String[]>([" ",".","-",",",":","=","+","*","#","%","@"]);
  const fontSize = 12;
  const lineHeight = 8;
  const letterSpacing = 2;

  console.log("render", asciiChar);

  function handleFlip() {
    console.log("handle flip called ", asciiChar);
    if (asciiChar[0] == " ") {
      //prettier-ignore
      const newascii= ["@", "%", "#", "*", "+", "=", ":", ",", "-", "."," "," "," "," "," "," "]
      setAsciiChars(newascii);
    } else {
      const newascii = [" ", ".", "-", ",", ":", "=", "+", "*", "#", "%", "@"];
      setAsciiChars(newascii);
    }
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
    newctx.fillStyle = "#6a7282";

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
    const span = document.createElement("span");
    span.textContent = "@";
    span.style.fontFamily = "monospace";
    span.style.fontSize = `${fontSize - 2}px`;
    span.style.letterSpacing = `${letterSpacing}px`;
    span.style.lineHeight = `${lineHeight}px`;
    span.style.position = "absolute";
    span.style.visibility = "hidden";
    document.body.appendChild(span);
    const rect = span.getBoundingClientRect();
    document.body.removeChild(span);
    return { width: Math.ceil(rect.width), height: Math.ceil(rect.height) };
  }
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
        const { width: charwidth, height: charheight } = measureCharBox();
        const blockHeight = charheight;
        const blockWidth = charwidth;

        for (let i = 0; i < imageData.height; i += blockHeight) {
          let row = "";

          for (let j = 0; j < imageData.width; j += blockWidth) {
            let sum = 0;
            let count = 0;

            for (let x = 0; x < blockHeight; x++) {
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
  }, [asciiChar]);
  return (
    <div className=" bg-black w-screen h-screen overflow-hidden">
      <NavBar />
      <canvas ref={canvasRef} hidden />
      <video ref={videoRef} muted playsInline style={{ display: "none" }} />

      <pre
        className={`leading-[${lineHeight}px] font-mono tracking-[${letterSpacing}px] text-gray-500 text-[${fontSize}px] w-screen h-screen`}
        ref={preRef}
      >
        {" "}
      </pre>
      <div className="fixed left-1/2  bottom-8  flex items-center justify-center gap-8">
        <Button
          onClick={captureImage}
          variant="secondary"
          size="lg"
          className="
       
   
    
    /* Outer Ring */
    w-24 h-24 rounded-full bg-transparent 
    border-[3px] border-white 
    p-2 /* This creates the distance between ring and inner circle */
    
    /* Resetting Shadcn defaults */
    p-2 /* This creates the distance between ring and inner circle */
    
    /* Resetting Shadcn defaults */
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

        <div
          onClick={handleFlip}
          className={`bg-black w-16 h-16 rounded-full flex items-center justify-center border border-amber-400 group cursor-pointer hover:scale-110 duration-150 ease-linear`}
        >
          <RefreshCcw size="24" color="white" />
        </div>
      </div>
    </div>
  );
}

export default App;

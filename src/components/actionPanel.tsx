import useSettingStore from "@/store/setting-store";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";
import { ColorModeSvg } from "@/lib/svg";
import type { RefObject } from "react";
import { measureCharBox } from "@/lib/measureCharBox";

export default function ActionPanel({
  preRef,
}: {
  preRef: RefObject<HTMLPreElement | null>;
}) {
  const { sidebar, color, theme, colorTheme, setTheme, setColorTheme } =
    useSettingStore();
  const { fontSize, letterSpacing, lineHeight, contrast } = useSettingStore();
  function handleFlip() {
    setTheme(theme.reverse());
  }

  function handleColorMode() {
    setColorTheme(!colorTheme);
  }

  function captureImage() {
    console.log("capture called 1");

    if (!preRef.current) return;

    const newCanvas = document.createElement("canvas");
    const newctx = newCanvas.getContext("2d");
    if (!newctx) return;
    const lines = preRef.current.textContent.replace(/\r\n/g, "\n").split("\n");
    const { width: charWidth, height: charHeight } = measureCharBox(
      fontSize,
      letterSpacing,
      lineHeight,
    );
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
  return (
    <div className="fixed left-1/2  bottom-4 px-2     flex items-center justify-center gap-8 overflow-hidden">
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
      <div
        onClick={handleFlip}
        className={`bg-black w-12 h-12   rounded-full flex items-center justify-center border border-white cursor-pointer hover:scale-110 duration-150 ease-in-out`}
      >
        <RefreshCcw size="24" color="white" />
      </div>

      <div
        onClick={handleColorMode}
        className={`bg-black w-12 h-12   rounded-full flex items-center justify-center border  cursor-pointer hover:scale-110 duration-150 ease-in-out
             ${colorTheme == true ? "border-[#5227ff]" : "border-white"}
            `}
      >
        <ColorModeSvg
          size={24}
          color={colorTheme == true ? "#5227ff" : "white"}
        />
      </div>
    </div>
  );
}

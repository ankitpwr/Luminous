import useSettingStore from "@/store/setting-store";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";
import { ColorModeSvg } from "@/lib/svg";

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import type { RefObject } from "react";

export default function ActionPanel({
  asciiCanvasRef,
}: {
  asciiCanvasRef: RefObject<HTMLCanvasElement | null>;
}) {
  const { sidebar, color, theme, colorTheme, setTheme, setColorTheme } =
    useSettingStore();
  // const { fontSize, letterSpacing, lineHeight, contrast } = useSettingStore();
  function handleFlip() {
    setTheme(theme.reverse());
  }

  function handleColorMode() {
    setColorTheme(!colorTheme);
  }

  function captureImage() {
    console.log("capture called 1", asciiCanvasRef.current);
    if (asciiCanvasRef.current == null) return;
    const asciiCanvas = asciiCanvasRef.current;
    console.log("capture called ");
    const dataUrl = asciiCanvas.toDataURL("image/png");
    console.log(dataUrl);
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `luminous-ascii${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <div className="fixed left-1/2 -translate-x-1/2  bottom-4 px-2     flex items-center justify-center gap-6 md:gap-10 overflow-hidden">
      <Tooltip>
        <TooltipTrigger>
          <div
            onClick={handleFlip}
            className={`bg-black w-12 h-12   rounded-full flex items-center justify-center border border-white cursor-pointer hover:scale-110 duration-150 ease-in-out`}
          >
            <RefreshCcw size="24" color="white" />
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-white text-black ">
          <p>Flip</p>
        </TooltipContent>
      </Tooltip>
      <Button
        onClick={captureImage}
        variant="secondary"
        size="lg"
        className=" cursor-pointer w-20 h-20
    md:w-24 md:h-24 rounded-full bg-transparent border-[1.5px]
    md:border-[3px] border-white 
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

      <Tooltip>
        <TooltipTrigger>
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
        </TooltipTrigger>
        <TooltipContent className="bg-white text-black ">
          <p>Color Mode</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

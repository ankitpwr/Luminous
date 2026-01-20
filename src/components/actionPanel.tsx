import useSettingStore from "@/store/setting-store";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";
import { ColorModeSvg } from "@/lib/svg";

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function ActionPanel({
  asciiCanvas,
}: {
  asciiCanvas: HTMLCanvasElement | null;
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
    console.log("capture called 1");
    if (asciiCanvas == null) return;

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

import useSettingStore from "@/store/setting-store";

import { MenuIcon, RefreshCcw, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function Menu() {
  const { sidebar, setSidebar, theme, asciiChars, setAsciiChar } =
    useSettingStore();
  function handleMenuToggle(val: boolean) {
    setSidebar(val);
  }

  function handleInvert() {
    if (asciiChars == theme.regular) setAsciiChar(theme.invert);
    else setAsciiChar(theme.regular);
  }

  return (
    <div className="flex flex-col gap-6">
      {sidebar == true ? (
        <X
          size="40"
          color="white"
          onClick={() => handleMenuToggle(false)}
          className=" cursor-pointer "
        />
      ) : (
        <div
          onClick={() => handleMenuToggle(true)}
          className=" p-2 md:p-2 bg-[#5227ff] rounded-lg cursor-pointer flex justify-center items-center  "
        >
          <MenuIcon className="w-6 h-6 md:w-8 md:h-8" color="white" />
        </div>
      )}

      <Tooltip>
        <TooltipTrigger>
          <div
            onClick={handleInvert}
            className={`bg-[#26292f] w-12 h-12   rounded-lg flex items-center justify-center border-[2px]  cursor-pointer  transition-transform active:scale-95
             ${asciiChars == theme.invert ? "border-[#3a3f47]" : "border-[#3a3f47]"}
            `}
          >
            <RefreshCcw
              size={24}
              color={asciiChars == theme.invert ? "#5227ff" : "white"}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-white text-black ">
          <p>Invert</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

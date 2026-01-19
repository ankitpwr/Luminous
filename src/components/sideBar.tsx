import useSettingStore from "@/store/setting-store";
import {
  AtSign,
  Binary,
  BlocksIcon,
  Grip,
  MinusCircle,
  PlusCircle,
} from "lucide-react";

import {
  Colors,
  Theme,
  type ThemeValue,
  type ThemeKeys,
  type ColorValue,
} from "../lib/styletypes";

import ElasticSlider from "./ElasticSlider";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import type { ReactElement } from "react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/lib/svg";

export default function SideBar() {
  const { setSidebar, color, setColor } = useSettingStore();
  const { theme, setTheme } = useSettingStore();
  const { setSize, setContrast } = useSettingStore();
  const svgIcons: Record<ThemeKeys, ReactElement> = {
    Normal: <AtSign color="white" />,
    Dot: <Grip color="white" />,
    Matrix: <Binary color="white" />,
    Blocky: <BlocksIcon color="white" />,
  };

  function handleMenu() {
    setSidebar(false);
  }
  function handleColorSelection(value: ColorValue) {
    setColor(value);
  }
  function handleTheme(value: ThemeValue) {
    if (value == Theme.Matrix) {
      setColor(Colors.Green);
    }
    setTheme(value);
  }

  function handleSlider(value: number) {
    console.log("value is ", value);

    setSize(value, value, 2);
  }
  function handleContrast(value: number) {
    console.log("value is ", value);
    setContrast(value);
  }
  return (
    <div className="fixed right-4 top-22  w-[330px] bg-[#101010]  rounded-lg overflow-hidden flex flex-col  pt-4 ">
      <div className="flex items-center justify-between pl-4 pb-4">
        <h1 className="font- text-3xl text-white font-montserrat font-bold">
          Settings
        </h1>
      </div>
      <div className=" h-px bg-[#2d2c37] mx-4 rounded-full flex justify-center"></div>

      <div className="flex flex-col justify-center pl-5 gap-2 py-4 ">
        <p className="text-white text-[14px] font-montserrat">Colors</p>
        <div className="flex items-center gap-3">
          {Object.entries(Colors).map(([key, value], index) => {
            return (
              <div
                onClick={() => handleColorSelection(value)}
                key={index}
                style={{ backgroundColor: value }}
                className={`w-8 h-8 rounded cursor-pointer transition-all ${
                  color === value
                    ? "border-1 border-white scale-110"
                    : "border border-transparent"
                }`}
              >
                {" "}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col justify-center pl-5 gap-2 py-4 ">
        <p className="text-white text-[14px] font-montserrat">Styles</p>
        <div className="flex items-center gap-3">
          {Object.entries(Theme).map(([key, value], index) => {
            return (
              <Tooltip key={index}>
                <TooltipTrigger>
                  {" "}
                  <div
                    key={index}
                    className={`border-[1px] border-gray-800 p-2 cursor-pointer rounded-[8px]
                ${theme == value ? "border-white scale-105" : ""}
              `}
                    onClick={() => handleTheme(value)}
                  >
                    {svgIcons[key as ThemeKeys]}
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-white text-black">
                  <p>{key}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>

      <div className=" h-px bg-[#2d2c37] mx-4 rounded-full flex justify-center"></div>

      <div className="flex flex-col justify-center pl-5 gap-2 py-4 ">
        <p className="text-white text-[14px] font-montserrat">Resolution</p>
        <div className="flex items-center justify-start">
          <ElasticSlider
            rightIcon={<PlusCircle size="16" color="white" />}
            leftIcon={<MinusCircle size="16" color="white" />}
            startingValue={8}
            defaultValue={10}
            maxValue={20}
            isStepped
            stepSize={1}
            onChange={handleSlider}
          />
        </div>
      </div>

      <div className="flex flex-col justify-center pl-5 gap-2 py-4 ">
        <p className="text-white text-[14px] font-montserrat">Contrast</p>
        <div className="flex items-center justify-start">
          <ElasticSlider
            rightIcon={<PlusCircle size="16" color="white" />}
            leftIcon={<MinusCircle size="16" color="white" />}
            startingValue={0.5}
            defaultValue={1.5}
            maxValue={3}
            isStepped
            stepSize={0.1}
            onChange={handleContrast}
          />
        </div>
      </div>
      <div className=" h-px bg-[#2d2c37] mx-4 rounded-full flex justify-center"></div>
      <div className="flex items-center  px-5 py-4 gap-4 justify-center ">
        <div className="p-2 bg-black rounded-lg cursor-pointer">
          {" "}
          <GithubIcon size={22} color="white" />
        </div>
        <div className="p-2 bg-black rounded-lg cursor-pointer">
          {" "}
          <TwitterIcon size={26} color="white" />
        </div>
        <div className="p-2 bg-black rounded-lg cursor-pointer">
          <LinkedinIcon size={24} color="white" />
        </div>
      </div>
    </div>
  );
}

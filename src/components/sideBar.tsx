import useSettingStore from "@/store/setting-store";
import {
  AtSign,
  Binary,
  BlocksIcon,
  Grip,
  MinusCircle,
  PlusCircle,
  X,
} from "lucide-react";

import {
  Colors,
  Theme,
  type ThemeValue,
  type ColorValue,
} from "../lib/styletypes";

import ElasticSlider from "./ElasticSlider";
import { NormalFontFamilyIcon } from "@/lib/svg";

export default function SideBar() {
  const { setSidebar, color, setColor } = useSettingStore();
  const { theme, setTheme } = useSettingStore();
  const { setSize, setContrast } = useSettingStore();
  // className={`w-6 h-6 rounded `}

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

    setSize(value, value - 1, 2);
  }
  function handleContrast(value: Number) {
    setContrast(value);
  }
  return (
    <div className="fixed right-4 top-20  w-[400px] bg-[#101010]  rounded overflow-hidden flex flex-col  pt-4">
      <div className="flex items-center justify-between px-4 pb-6">
        <h1 className="font- text-3xl text-white">Settings</h1>
        <X
          onClick={handleMenu}
          size={32}
          color="white"
          className="cursor-pointer"
        />
      </div>
      <div className="w-full h-px bg-[#2d2c37] rounded-full"></div>

      <div className="flex flex-col justify-center px-5 gap-2 py-4 ">
        <p className="text-white text-[14px]">Colors</p>
        <div className="flex items-center gap-3">
          {Object.entries(Colors).map(([key, value], index) => {
            return (
              <div
                onClick={() => handleColorSelection(value)}
                key={index}
                style={{ backgroundColor: value }}
                className={`w-8 h-8 rounded cursor-pointer transition-all ${
                  color === value
                    ? "border-2 border-white scale-110"
                    : "border border-transparent"
                }`}
              >
                {" "}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col justify-center px-5 gap-2 py-4 ">
        <p className="text-white text-[14px]">Styles</p>
        <div className="flex items-center gap-3">
          <div
            className={`border-[2px] border-gray-800 p-2 cursor-pointer rounded-[8px]
                ${theme == Theme.Normal ? "border-white" : ""}
              `}
            onClick={() => handleTheme(Theme.Normal)}
          >
            <AtSign color="white" />
          </div>
          <div
            className={`border-[2px] border-gray-800 p-2 cursor-pointer rounded-[8px]
                ${theme == Theme.Dot ? "border-white" : ""}
              `}
            onClick={() => handleTheme(Theme.Dot)}
          >
            <Grip color="white" />
          </div>
          <div
            className={`border-[2px] border-gray-800 p-2 cursor-pointer rounded-[8px]
                ${theme == Theme.Matrix ? "border-white" : ""}
              `}
            onClick={() => handleTheme(Theme.Matrix)}
          >
            <Binary color="white" />
          </div>
          <div
            className={`border-[2px] border-gray-800 p-2 cursor-pointer rounded-[8px]
                ${theme == Theme.Blocky ? "border-white" : ""}
              `}
            onClick={() => handleTheme(Theme.Blocky)}
          >
            <BlocksIcon color="white" />
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-[#2d2c37] rounded-full"></div>

      <div className="flex flex-col justify-center px-5 gap-2 py-4 ">
        <p className="text-white text-[14px]">Resolution</p>
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

      <div className="flex flex-col justify-center px-5 gap-2 py-4 ">
        <p className="text-white text-[14px]">Contrast</p>
        <div className="flex items-center justify-start">
          <ElasticSlider
            rightIcon={<PlusCircle size="16" color="white" />}
            leftIcon={<MinusCircle size="16" color="white" />}
            startingValue={0.5}
            defaultValue={1}
            maxValue={3}
            isStepped
            stepSize={0.1}
            onChange={handleContrast}
          />
        </div>
      </div>
    </div>
  );
}

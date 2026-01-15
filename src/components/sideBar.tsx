import useSettingStore from "@/store/setting-store";
import { MinusCircle, PlusCircle, X } from "lucide-react";

import {
  Colors,
  Theme,
  type ThemeValue,
  type ColorValue,
} from "../lib/styletypes";
import { Slider } from "./ui/slider";
import ElasticSlider from "./ElasticSlider";

export default function SideBar() {
  const { sidebar, setSidebar, color, setColor } = useSettingStore();
  const { theme, setTheme } = useSettingStore();
  const { fontSize, letterSpacing, lineHeight, setSize } = useSettingStore();
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

  function handleSlider(value: Number) {
    console.log("value is ", value);
    setSize(value, value, 2);
  }
  return (
    <div className="fixed right-0 top-0 h-screen w-[400px] bg-[#232329] border-r  overflow-hidden flex flex-col  pt-8 ">
      <div className="flex items-center justify-between px-5 pb-8">
        <h1 className="font-press-start text-2xl text-[#F4EEFF]">Settings</h1>
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

      <div className="w-full h-px bg-[#2d2c37] rounded-full"></div>

      <div className="flex flex-col justify-center px-5 gap-2 py-4 ">
        <p className="text-white text-[14px]">Styles</p>
        <div className="flex items-center gap-3">
          {Object.entries(Theme)
            .filter(([key, value]) => key != "flip")
            .map(([key, value], index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleTheme(value)}
                  className={`py-[7px] w-24 border border-[#ff4533] hover:bg-[#ff4533]  ease-in-out duration-100 flex items-center justify-center rounded text-white text-sm cursor-pointer`}
                >
                  <span>{key}</span>
                </div>
              );
            })}
        </div>
      </div>

      <div className="w-full h-px bg-[#2d2c37] rounded-full"></div>

      <div className="flex flex-col justify-center px-5 gap-2 py-4 ">
        <p className="text-white text-[14px]">Resolution</p>
        <div className="flex items-center justify-start">
          {/* <Slider
            defaultValue={[10]}
            max={18}
            step={1}
            min={8}
            className={`w-60`}
          /> */}
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
    </div>
  );
}

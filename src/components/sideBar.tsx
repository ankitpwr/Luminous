import useSettingStore from "@/store/setting-store";
import { X } from "lucide-react";

import { Colors, type ColorValue } from "../lib/styletypes";

export default function SideBar() {
  const { sidebar, setSidebar, color, setColor } = useSettingStore();
  // className={`w-6 h-6 rounded `}

  function handleMenu() {
    setSidebar(false);
  }
  function handleColorSelection(value: ColorValue) {
    setColor(value);
  }
  return (
    <div className="fixed right-0 top-0 h-screen w-[400px] bg-[#232329] border-r  overflow-hidden flex flex-col  pt-8 gap-8">
      <div className="flex items-center justify-between px-6">
        <h1 className="font-press-start text-2xl text-[#F4EEFF]">Settings</h1>
        <X
          onClick={handleMenu}
          size={32}
          color="white"
          className="cursor-pointer"
        />
      </div>
      <div className="w-full h-1 bg-[#2d2c37] rounded-full"></div>

      <div className="flex flex-col justify-center px-6 ">
        <p className="text-white">Colors</p>
        <div className="flex items-center gap-3">
          {Object.entries(Colors).map(([key, value], index) => {
            return (
              <div
                onClick={() => handleColorSelection(value)}
                key={index}
                style={{ backgroundColor: value }}
                className={`w-8 h-8 rounded-full cursor-pointer transition-all ${
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
    </div>
  );
}

import useSettingStore from "@/store/setting-store";
import { MenuIcon } from "lucide-react";
import React from "react";
import SideBar from "./sideBar";

export default function Menu() {
  const { sidebar, setSidebar } = useSettingStore();
  function handleMenuToggle() {
    setSidebar(true);
  }

  console.log(sidebar);
  return (
    <div
      onClick={handleMenuToggle}
      className="fixed right-8 top-5 px-4 py-4 bg-gradient-to-b from-black to-gray-900 border border-gray-800 rounded-lg cursor-pointer"
    >
      <MenuIcon size="30" color="white" />
    </div>
  );
}

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
      className="fixed right-8 top-5 px-3 py-3 bg-[#5227ff] rounded-lg cursor-pointer"
    >
      <MenuIcon size="30" color="white" />
    </div>
  );
}

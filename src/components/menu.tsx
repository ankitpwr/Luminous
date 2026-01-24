import useSettingStore from "@/store/setting-store";
import { MenuIcon, X } from "lucide-react";

export default function Menu() {
  const { sidebar, setSidebar } = useSettingStore();
  function handleMenuToggle(val: boolean) {
    setSidebar(val);
  }

  return (
    <>
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
          className=" p-2 md:p-2 bg-[#5227ff] rounded-lg cursor-pointer  "
        >
          <MenuIcon className="w-6 h-6 md:w-8 md:h-8" color="white" />
        </div>
      )}
    </>
  );
}

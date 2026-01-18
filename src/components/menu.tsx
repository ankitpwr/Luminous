import useSettingStore from "@/store/setting-store";
import { MenuIcon, X } from "lucide-react";

export default function Menu() {
  const { sidebar, setSidebar } = useSettingStore();
  function handleMenuToggle(val: boolean) {
    setSidebar(val);
  }

  console.log(sidebar);
  return (
    <>
      {sidebar == true ? (
        <X
          size="40"
          color="white"
          onClick={() => handleMenuToggle(false)}
          className="fixed right-10 top-6  cursor-pointer hover:scale-110 duration-150 ease-in-out"
        />
      ) : (
        <div
          onClick={() => handleMenuToggle(true)}
          className="fixed right-8 top-5 px-3 py-3 bg-[#5227ff] rounded-lg cursor-pointer"
        >
          <MenuIcon size="30" color="white" />
        </div>
      )}
    </>
  );
}

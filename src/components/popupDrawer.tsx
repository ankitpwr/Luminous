import useSettingStore from "@/store/setting-store";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { CameraOff } from "lucide-react";

export default function PopupDrawer() {
  const { cameraReady } = useSettingStore();
  return (
    <Drawer open={cameraReady === "denied"}>
      <DrawerContent className="bg-black ">
        <DrawerHeader>
          <DrawerTitle className="text-white text-4xl pb-4 font-bold font-montserrat">
            <span> Camera Access Required !</span>
          </DrawerTitle>
          <DrawerDescription className="text-white text-[14px] font-montserrat">
            <div className="flex flex-col gap-4 items-center">
              <CameraOff className="w-24 h-24 md:w-32 md:h-32" color="white" />
              <span>
                {" "}
                Please allow camera access to use this application.
                <br />
                Go to browser settings and enable camera permission.
                <br />
              </span>
            </div>
          </DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}

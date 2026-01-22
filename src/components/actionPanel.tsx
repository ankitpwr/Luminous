import useSettingStore from "@/store/setting-store";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";
import { ColorModeSvg } from "@/lib/svg";

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useRef, type RefObject } from "react";
import CameraControl from "./cameraControl";

export default function ActionPanel({
  asciiCanvasRef,
}: {
  asciiCanvasRef: RefObject<HTMLCanvasElement | null>;
}) {
  const { theme, colorTheme, video, startVideoRecording } = useSettingStore();
  const { setStartVideoRecording, setTheme, setColorTheme } = useSettingStore();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunkRef = useRef<Blob[]>([]);

  function handleFlip() {
    setTheme(theme.reverse());
  }

  function handleColorMode() {
    setColorTheme(!colorTheme);
  }
  function handleStartVideo() {
    if (startVideoRecording == false) startRecording();
    else if (startVideoRecording == true) stopRecording();
    setStartVideoRecording(!startVideoRecording);
  }

  function stopRecording() {
    console.log("stop recording ");
    mediaRecorderRef.current!.stop();
  }

  function startRecording() {
    console.log(`start recording`);
    const stream = asciiCanvasRef.current!.captureStream(24);
    const recorder = new MediaRecorder(stream, {
      mimeType: "video/webm; codecs=vp9",
    });
    recorder.start();
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunkRef.current.push(e.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunkRef.current, {
        type: "video/webm",
      });
      chunkRef.current = [];
      const recordedMedia = document.createElement("video");
      recordedMedia.controls = true;
      const recordedMediaURL = URL.createObjectURL(blob);
      recordedMedia.src = recordedMediaURL;
      const downloadButton = document.createElement("a");
      downloadButton.href = recordedMediaURL;
      downloadButton.download = `luminousVideo${Date.now()}`;
      downloadButton.click();

      setTimeout(() => URL.revokeObjectURL(recordedMediaURL), 1000);
    };
  }

  function captureImage() {
    if (asciiCanvasRef.current == null) return;
    const asciiCanvas = asciiCanvasRef.current;
    const dataUrl = asciiCanvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `luminous-ascii${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <div className="fixed left-1/2 -translate-x-1/2  bottom-4 flex flex-col items-center gap-6">
      <CameraControl />
      <div className=" px-2  flex items-center justify-center gap-6 md:gap-10 overflow-hidden">
        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={handleFlip}
              className={`bg-black w-12 h-12   rounded-full flex items-center justify-center border border-white cursor-pointer hover:scale-110 duration-150 ease-in-out`}
            >
              <RefreshCcw size="24" color="white" />
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-white text-black ">
            <p>Flip</p>
          </TooltipContent>
        </Tooltip>
        <Button
          onClick={() => {
            video == true ? handleStartVideo() : captureImage();
          }}
          variant="secondary"
          size="lg"
          className={`cursor-pointer w-20 h-20 md:w-24 md:h-24 rounded-full bg-transparent border-[1px] md:border-[3px]
                    p-2 hover:bg-transparent transition-transform active:scale-95 
                    ${video == true ? "border-red-600" : " border-white "}`}
        >
          <div
            className={`w-full h-full  rounded-full shadow-md
               ${video == true ? "bg-red-600" : " bg-white "}`}
          />
        </Button>

        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={handleColorMode}
              className={`bg-black w-12 h-12   rounded-full flex items-center justify-center border  cursor-pointer hover:scale-110 duration-150 ease-in-out
             ${colorTheme == true ? "border-[#5227ff]" : "border-white"}
            `}
            >
              <ColorModeSvg
                size={24}
                color={colorTheme == true ? "#5227ff" : "white"}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-white text-black ">
            <p>Color Mode</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}

import useSettingStore from "@/store/setting-store";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";
import { ColorModeSvg } from "@/lib/svg";

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useRef, type RefObject } from "react";
import CameraControl from "./cameraControl";
import Timer from "./timer";

export default function ActionPanel({
  asciiCanvasRef,
}: {
  asciiCanvasRef: RefObject<HTMLCanvasElement | null>;
}) {
  const { theme, colorTheme, video, startVideoRecording, cameraReady } =
    useSettingStore();
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
    if (!cameraReady) return;
    if (startVideoRecording == false) startRecording();
    else if (startVideoRecording == true) stopRecording();
    setStartVideoRecording(!startVideoRecording);
  }

  function stopRecording() {
    console.log("stop recording ");
    mediaRecorderRef.current!.stop();
  }

  function startRecording() {
    const stream = asciiCanvasRef.current!.captureStream(30);
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
    if (!asciiCanvasRef.current || !cameraReady) return;
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
              className={`bg-[#1b242f] w-12 h-12   rounded-full flex items-center justify-center border-[2px] border-[#3a3f47] cursor-pointer transition-transform active:scale-95`}
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
                    p-2 hover:bg-transparent transition-transform active:scale-95 flex items-center justify-center 
                    `}
        >
          {video == false ? (
            <div className={`w-full h-full  rounded-full shadow-md bg-white`} />
          ) : (
            <div
              className={`shadow-md   bg-red-600 
               ${startVideoRecording == true ? "animate-pulse rounded-lg w-[70%] h-[70%]" : " rounded-full w-full h-full"}`}
            />
          )}
        </Button>

        <Tooltip>
          <TooltipTrigger>
            <div
              onClick={handleColorMode}
              className={`bg-[#1b242f] w-12 h-12   rounded-full flex items-center justify-center border-[2px]  cursor-pointer  transition-transform active:scale-95
             ${colorTheme == true ? "border-[#3a3f47]" : "border-[#3a3f47]"}
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

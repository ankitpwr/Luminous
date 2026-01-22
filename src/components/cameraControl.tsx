import useSettingStore from "@/store/setting-store";

export default function CameraControl() {
  const { video, setVideo } = useSettingStore();

  return (
    <div
      className={`flex py-[6px]  px-[6px] gap-2 border border-[#5227ff] bg-[#26292f] rounded-full text-white font-montserrat text-[16px] justify-center items-center`}
    >
      <div
        onClick={() => setVideo(false)}
        className={` py-1.5 w-26 rounded-full flex items-center justify-center cursor-pointer
         ${video == false ? "bg-[#5227ff]" : ""}
        `}
      >
        <span>Photo</span>
      </div>
      <div
        onClick={() => setVideo(true)}
        className={` py-[6px] w-26  rounded-full flex items-center justify-center cursor-pointer 
          ${video == true ? "bg-[#5227ff]" : ""}`}
      >
        <span>Video</span>
      </div>
    </div>
  );
}

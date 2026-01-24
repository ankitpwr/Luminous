import useSettingStore from "@/store/setting-store";

export default function CameraControl() {
  const { video, setVideo } = useSettingStore();

  return (
    <div
      className={`flex py-[4px]  px-[4px] gap-1 bg-[#26292f] rounded-full text-white font-montserrat text-[14px] justify-center items-center`}
    >
      <div
        onClick={() => setVideo(false)}
        className={` py-1.5 w-22 rounded-full flex items-center justify-center cursor-pointer
         ${video == false ? "bg-[#5227ff]" : ""}
        `}
      >
        <span>Photo</span>
      </div>
      <div
        onClick={() => setVideo(true)}
        className={` py-1.5 w-22  rounded-full flex items-center justify-center cursor-pointer 
          ${video == true ? "bg-[#5227ff]" : ""}`}
      >
        <span>Video</span>
      </div>
    </div>
  );
}

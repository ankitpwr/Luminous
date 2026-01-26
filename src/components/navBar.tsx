import GradientText from "./reactBits/GradientText";

export default function TitleBar() {
  return (
    <div className="  ">
      <GradientText animationSpeed={3} pauseOnHover showBorder className="">
        <span className="font-montserrat text-lg md:text-2xl font-bold ">
          Luminous
        </span>
      </GradientText>
    </div>
  );
}

import GradientText from "./reactBits/GradientText";

export default function NavBar() {
  return (
    <div className=" fixed left-6 top-6  ">
      <GradientText animationSpeed={3} pauseOnHover showBorder className="">
        <span className="font-montserrat text-2xl font-bold ">Luminous</span>
      </GradientText>
    </div>
  );
}

import GradientText from "./reactBits/GradientText";

export default function NavBar() {
  return (
    <div className=" fixed left-4 top-4  ">
      <GradientText animationSpeed={3} pauseOnHover showBorder className="">
        <span className="font-montserrat text-xl ">Luminous</span>
      </GradientText>
    </div>
  );
}

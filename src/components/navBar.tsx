import { AtSign } from "lucide-react";
import StarBorder from "./reactBits/StarBorder";

export default function NavBar() {
  return (
    <div className=" fixed left-4 top-4  ">
      <StarBorder
        thickness={4}
        speed="7s"
        color="#F4EEFF"
        className="font-press-start text-4xl  "
      >
        <span>Luminous</span>
      </StarBorder>
    </div>
  );
}

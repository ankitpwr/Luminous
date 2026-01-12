import React from "react";
import Shuffle from "./reactBits/Shuffle";

export default function NavBar() {
  return (
    <div
      className="
  /* Positioning */
  fixed left-4 top-4 
  
  /* Outer Container */
  w-55 h-25 rounded-4xl
  bg-gradient-to-br from-[#fbfbfb] to-[#4b16bd] 
  
  /* Shadow: Made permanent (removed 'hover:') */
  shadow-[0px_0px_30px_1px_rgba(0,255,117,0.2)]
"
    >
      <div
        className="
    /* Inner Container */
    w-full h-full bg-[#1a1a1a] 
    flex items-center justify-center p-3
    
    /* Scale & Corners: Made permanent (removed 'group-hover:') */
    scale-[0.98] 
    rounded-4xl
  "
      >
        <span className="text-[#696FC7] text-2xl ">Luminous</span>
      </div>
    </div>
  );
}

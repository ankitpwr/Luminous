import { useState } from "react";

import "./App.css";

function App() {
  return (
    <div className="bg-black w-screen h-screen">
      <p className="text-2xl"> hello world</p>
      <canvas height={500} width={500} className="bg-white" />
    </div>
  );
}

export default App;

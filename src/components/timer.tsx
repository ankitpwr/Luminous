import { Minimize } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Timer() {
  const [startTime, setStartTime] = useState(Date.now());
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  function calculateTimePassed() {
    const currTime = Date.now();
    let difference = currTime - startTime;
    let hours = (difference / (1000 * 60 * 60)) % 24;
    let minutes = (difference / (1000 * 60)) % 60;
    let seconds = (difference / 1000) % 60;

    setHours(Math.floor(hours));
    setMinutes(Math.floor(minutes));
    setSeconds(Math.floor(seconds));
  }
  useEffect(() => {
    const id = setInterval(calculateTimePassed, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);
  return (
    <div className="flex gap-1 fixed top-6 left-1/2 -translate-x-1/2 text-white bg-red-600 px-4 py-1 rounded-full font-montserrat font-semibold">
      <span> {hours}</span>
      <span>:</span>
      <span> {minutes}</span>
      <span>:</span>
      <span> {seconds}</span>
    </div>
  );
}

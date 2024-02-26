import React from "react";
import {
  TypewriterEffect,
  TypewriterEffectSmooth,
} from "../animated/typewriter-effect";

function Motto() {
  const words = [
    { text: "Consistency," },
    { text: "Discipline," },
    { text: "Dedication" },
  ];
  return (
    <TypewriterEffectSmooth
      className="p-4 items-center justify-center text-xl"
      cursorClassName="bg-primary"
      words={words}
    />
  );
}

export default Motto;

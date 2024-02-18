import { ExerciseType } from "@/lib/ExerciseType";
import Image from "next/image";
import React from "react";

type ExerciseProps = {
  exercise: ExerciseType;
};

function Exercise({ exercise }: ExerciseProps) {
  return (
    <div className="flex gap-2 items-center">
      <Image
        loading="lazy"
        src="/otherIcons/dumbell.png"
        alt="chest"
        width={24}
        height={24}
      />
      <span className="text-md">
        {exercise.exercise_name.replaceAll("_", " ")}{" "}
      </span>{" "}
    </div>
  );
}

export default Exercise;

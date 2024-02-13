import { ExerciseType } from "@/lib/ExerciseType";
import Image from "next/image";
import React from "react";

type ExerciseProps = {
  exercise: ExerciseType;
};

function Exercise({ exercise }: ExerciseProps) {
  return (
    <div className="flex gap-4 items-center">
      {exercise.image && (
        <Image
          width={64}
          height={64}
          className="bg-blue-50 p-2 rounded-md"
          alt={exercise.exercise_name}
          src={exercise.image}
        />
      )}
      <span className="text-md">
        {exercise.exercise_name.replaceAll("_", " ")}{" "}
      </span>{" "}
    </div>
  );
}

export default Exercise;

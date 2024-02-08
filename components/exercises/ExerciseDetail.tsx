import { ExerciseDataType } from "@/lib/ExerciseType";
import React from "react";
type ExerciseDetailProps = {
  exerciseData: ExerciseDataType | undefined;
};
function ExerciseDetailBlock({ exerciseData }: ExerciseDetailProps) {
  if (!exerciseData) return <p>You have no data on this yet.</p>;
  const { date, powerLevel, performance, unit } = exerciseData;
  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <div className="flex justify-between w-full">
        <p>Date: {date?.split("-").reverse().join().replaceAll(",", ".")} </p>
        <p>Power Level: {powerLevel} </p>
      </div>
      <div className="flex justify-between w-full">
        <p>Performance: {performance} </p> <p>Unit: {unit} </p>
      </div>
    </div>
  );
}

export default ExerciseDetailBlock;

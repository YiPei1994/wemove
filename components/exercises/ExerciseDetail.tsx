import { ExerciseDataType } from "@/lib/ExerciseType";
import React from "react";
type ExerciseDetailProps = {
  exerciseData: ExerciseDataType | undefined;
};
function ExerciseDetailBlock({ exerciseData }: ExerciseDetailProps) {
  if (!exerciseData) return <p>You have no data on this yet.</p>;
  const { date, avg_reps, avg_performance } = exerciseData;

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <div className="flex justify-between w-full">
        <p>Date: {date?.split("-").reverse().join().replaceAll(",", ".")} </p>
      </div>
      <div className="flex flex-col w-full">
        <h4>Performance: </h4>

        <div className="flex gap-4 items-center">
          <span>Average of {avg_reps} reps </span>
          <span>with {avg_performance} kgs </span>
        </div>
      </div>
    </div>
  );
}

export default ExerciseDetailBlock;

import { ExerciseDataType, ExerciseType } from "@/lib/ExerciseType";
import React from "react";

type ExerciseDetailProps = {
  exerciseData: ExerciseDataType[];
  type: string;
  exercise: ExerciseType;
};
function ExerciseDetailBlock({
  exerciseData,
  type,
  exercise,
}: ExerciseDetailProps) {
  const { date, avg_reps, avg_performance } = exerciseData[0] || {};

  if (!exerciseData || !exercise) return <p>You have no data on this yet.</p>;

  return (
    <div className="flex flex-col  justify-center items-center my-2">
      <div className="flex justify-between w-full items-center p-2 ">
        <span>Date </span>
        <span>Average</span>
      </div>
      <div className="flex flex-col w-full p-2">
        <div className="flex gap-4 items-center">
          <div className="flex justify-between items-center w-full">
            <span>{date} </span>
            {type !== "cardio" ? (
              <span>
                {avg_performance} {exercise.metric} x {avg_reps} {exercise.unit}
              </span>
            ) : (
              <span>
                {`${((+avg_performance * 10) / avg_reps).toFixed(2)}`} speed /
                min{" "}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExerciseDetailBlock;

import { ExerciseDataType } from "@/lib/ExerciseType";
import React from "react";

type ExerciseDetailProps = {
  exerciseData: ExerciseDataType[];
  type: string;
};
function ExerciseDetailBlock({ exerciseData, type }: ExerciseDetailProps) {
  const { date, avg_reps, avg_performance } = exerciseData[0] || {};

  if (!exerciseData) return <p>You have no data on this yet.</p>;

  return (
    <div className="flex flex-col  justify-center items-center my-2">
      <div className="flex justify-between w-full items-center p-2 ">
        <span>Date </span>
        <span>Average</span>
      </div>
      <div className="flex flex-col w-full p-2">
        <div className="flex gap-4 items-center">
          {type === "cardio" ? (
            <span>
              {avg_performance} in distance in {avg_reps} mins
            </span>
          ) : (
            <div className="flex justify-between items-center w-full">
              <span>{date} </span>
              <span>
                {" "}
                {avg_performance} kgs x {avg_reps} reps{" "}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExerciseDetailBlock;

import { ExerciseDataType, ExerciseType } from "@/lib/ExerciseType";
import React from "react";

type ExercisesDataDetailsProps = {
  allExerciseData: ExerciseDataType[];
  exercise: ExerciseType;
};

function ExercisesDataDetails({
  allExerciseData,
  exercise,
}: ExercisesDataDetailsProps) {
  return (
    <div className="flex flex-col  justify-center items-center my-2">
      <div className="flex justify-between w-full items-center p-2 ">
        <span>Date:</span> <span>Average</span>{" "}
      </div>
      <ul className="flex flex-col  w-full  ">
        {allExerciseData.map((data) => (
          <li
            key={data.data_id}
            className="w-full flex justify-between items-center p-2 odd:text-[##CF8787] "
          >
            <span>{data.date} </span>{" "}
            <span>
              {data.avg_performance} {exercise.metric} with {data.avg_reps}{" "}
              {exercise.unit}
            </span>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExercisesDataDetails;

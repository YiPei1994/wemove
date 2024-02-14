import { ExerciseDataType } from "@/lib/ExerciseType";
import React from "react";

type ExercisesDataDetailsProps = {
  allExerciseData: ExerciseDataType[];
};

function ExercisesDataDetails({ allExerciseData }: ExercisesDataDetailsProps) {
  return (
    <div className="flex flex-col  justify-center items-center my-2">
      <div className="flex justify-between w-full items-center p-2 bg-neutral-950 text-blue-50">
        <span>Date:</span> <span>Average</span>{" "}
      </div>
      <ul className="flex flex-col  w-full  ">
        {allExerciseData.map((data) => (
          <li
            key={data.data_id}
            className="w-full flex justify-between items-center p-2 odd:bg-neutral-200 even:bg-slate-100"
          >
            <span>{data.date} </span>{" "}
            <span>
              {data.avg_performance} kgs x {data.avg_reps} reps
            </span>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExercisesDataDetails;

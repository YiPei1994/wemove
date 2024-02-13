import { ExerciseDataType } from "@/lib/ExerciseType";
import { getExerciseByExerciseId } from "@/servises/apiExercise";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Spinner from "../Spinner";
import Image from "next/image";
type ExerciseDetailProps = {
  exerciseData: ExerciseDataType;
  type: string;
};
function ExerciseDetailBlock({ exerciseData, type }: ExerciseDetailProps) {
  const { date, avg_reps, avg_performance } = exerciseData;

  if (!exerciseData) return <p>You have no data on this yet.</p>;

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <div className="flex justify-between w-full">
        <p>Date: {date?.split("-").reverse().join().replaceAll(",", ".")} </p>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex gap-4 items-center">
          {type === "cardio" ? (
            <span>
              You reached {avg_performance} in distance in {avg_reps} mins
            </span>
          ) : (
            <div>
              <span>Average of {avg_reps} reps</span>
              <span> with {avg_performance} kgs </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExerciseDetailBlock;

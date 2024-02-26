import { ExerciseDataType, ExerciseType } from "@/lib/ExerciseType";
import React from "react";
import { useDeleteExerciseData } from "./hooks/useDeleteExerciseData";
import { HiOutlineTrash } from "react-icons/hi2";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "../ui/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";

type ExercisesDataDetailsProps = {
  allExerciseData: ExerciseDataType[];
  exercise: ExerciseType;
  type: string;
};

function ExercisesDataDetails({
  allExerciseData,
  exercise,
  type,
}: ExercisesDataDetailsProps) {
  const query = `${type}Data`;
  const { deletingExerciseData } = useDeleteExerciseData();
  const queryClient = useQueryClient();

  function handleDeleteExerciseData(id: number, userId: string) {
    deletingExerciseData(
      { query, id, userId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [query] });
          toast({ description: "Deleted." });
        },
      }
    );
  }
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
            {type !== "cardio" ? (
              <span>
                {data.avg_performance} {exercise.metric} x {data.avg_reps}{" "}
                {exercise.unit}
              </span>
            ) : (
              <span>
                {`${((+data.avg_performance * 10) / data.avg_reps).toFixed(2)}`}{" "}
                speed / min{" "}
              </span>
            )}
            <Popover>
              <PopoverTrigger>
                <HiOutlineTrash className="text-primary" />
              </PopoverTrigger>
              <PopoverContent className="w-80 mx-auto bg-accent p-4 rounded-lg">
                <div className="flex flex-col gap-4 justify-center items-center">
                  <p>Are you sure?</p>
                  <Button
                    onClick={() =>
                      handleDeleteExerciseData(data.data_id, data.userId)
                    }
                    className="text-primary"
                  >
                    Delete
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExercisesDataDetails;

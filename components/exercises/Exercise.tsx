import { ExerciseType } from "@/lib/ExerciseType";
import Image from "next/image";
import React, { useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { useDeleteExercise } from "./useDeleteExercise";
import { useQueryClient } from "@tanstack/react-query";

type ExerciseProps = {
  exercise: ExerciseType;
  query: string;
};

function Exercise({ exercise, query }: ExerciseProps) {
  const { deleting } = useDeleteExercise();
  const queryClient = useQueryClient();

  function handleDelete(
    e: React.MouseEvent<SVGElement, MouseEvent>,
    id: number
  ) {
    e.preventDefault();
    console.log(id);
    deleting(
      { query, id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [query] });
        },
      }
    );
  }

  function handleEdit(e: React.MouseEvent<SVGElement, MouseEvent>, id: number) {
    e.preventDefault();
  }
  return (
    <>
      <div className="flex gap-4 w-full items-center">
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
        <div className="flex gap-4 items-center ml-auto text-2xl">
          <MdEditSquare onClick={(e) => handleEdit(e, exercise.exercise_id)} />

          <RiDeleteBin4Fill
            onClick={(e) => handleDelete(e, exercise.exercise_id)}
          />
        </div>
      </div>
    </>
  );
}

export default Exercise;

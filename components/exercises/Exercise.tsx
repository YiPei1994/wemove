import { ExerciseType } from "@/lib/ExerciseType";
import Image from "next/image";
import React, { useState } from "react";
import { HiOutlinePencil } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi2";
import { useDeleteExercise } from "./useDeleteExercise";
import { useQueryClient } from "@tanstack/react-query";
import { useDisplayExerciseEditForm } from "@/store/useExerciseEditForm";

type ExerciseProps = {
  exercise: ExerciseType;
  query: string;
};

function Exercise({ exercise, query }: ExerciseProps) {
  const { deleting } = useDeleteExercise();
  const queryClient = useQueryClient();
  const { toggleDisplayExerciseEditForm } = useDisplayExerciseEditForm();
  function handleDelete(
    e: React.MouseEvent<SVGElement, MouseEvent>,
    id: number
  ) {
    e.preventDefault();

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
    toggleDisplayExerciseEditForm();
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
        <span className="text-md truncate">
          {exercise.exercise_name.replaceAll("_", " ")}{" "}
        </span>{" "}
        <div className="flex gap-4 items-center ml-auto text-2xl">
          <HiOutlinePencil
            onClick={(e) => handleEdit(e, exercise.exercise_id)}
          />

          <HiOutlineTrash
            onClick={(e) => handleDelete(e, exercise.exercise_id)}
          />
        </div>
      </div>
    </>
  );
}

export default Exercise;

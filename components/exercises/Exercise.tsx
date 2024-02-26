import { ExerciseType } from "@/lib/ExerciseType";
import Image from "next/image";
import React, { useState } from "react";
import { HiOutlinePencil } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi2";
import { useDeleteExercise } from "./hooks/useDeleteExercise";
import { useQueryClient } from "@tanstack/react-query";
import { useDisplayExerciseEditForm } from "@/store/useExerciseEditForm";
import ExerciseEditForm from "./ExerciseEditForm";

type ExerciseProps = {
  exercise: ExerciseType;
  query: string;
};

function Exercise({ exercise, query }: ExerciseProps) {
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
      </div>
    </>
  );
}

export default Exercise;

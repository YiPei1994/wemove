import { ExerciseType } from "@/lib/ExerciseType";
import React from "react";
import { useEditExercise } from "./useEditExercise";
import { useForm } from "react-hook-form";
import { useDisplayExerciseEditForm } from "@/store/useExerciseEditForm";
import { useQueryClient } from "@tanstack/react-query";

type ExerciseEditFormProps = {
  exercise: ExerciseType;
  query: string;
};

function ExerciseEditForm({ exercise, query }: ExerciseEditFormProps) {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<ExerciseType>({
    defaultValues: exercise,
  });
  const { editingExercise } = useEditExercise();
  const { toggleDisplayExerciseEditForm } = useDisplayExerciseEditForm();

  function onSubmit(data: ExerciseType) {
    editingExercise(
      { editedExercise: data, query },
      {
        onSuccess: () => {
          toggleDisplayExerciseEditForm();
          queryClient.invalidateQueries({ queryKey: [query] });
        },
      }
    );
  }

  return (
    <form
      className="flex flex-col gap-4 items-center justify-center w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="p-2"
        type="text"
        required
        id="exercise_name"
        {...register("exercise_name")}
      />
      <div className="flex gap-4 w-full">
        <input
          className="p-2 w-1/2"
          type="text"
          required
          id="metric"
          {...register("metric")}
        />
        <input
          className="p-2 w-1/2"
          type="text"
          required
          id="unit"
          {...register("unit")}
        />
      </div>

      <button className="  px-6 py-1">Edit</button>
    </form>
  );
}

export default ExerciseEditForm;

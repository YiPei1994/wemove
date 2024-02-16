"use client";

import { useCurrentUser } from "@/components/auth/useCurrentUser";
import { useAddExercise } from "@/components/exercises/useAddExercise";
import { NewExercise } from "@/lib/ExerciseType";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type NewExerciseFormProps = {
  params: {
    typeslug: string;
  };
};

function NewExerciseForm({ params }: NewExerciseFormProps) {
  const query = params.typeslug;
  const [exerciseName, setExerciseName] = useState("");

  const router = useRouter();
  const { addExercise } = useAddExercise();
  const queryclient = useQueryClient();
  const { user } = useCurrentUser();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!exerciseName || !user) return;
    const newExercise: NewExercise = {
      exercise_name: exerciseName.replaceAll(" ", "_").toLowerCase(),
      slug: `${exerciseName.replaceAll(" ", "_")}_${uuidv4()}`,
      owner: user.id,
    };

    addExercise(
      { newExercise, query },
      {
        onSuccess: () => {
          router.push(`/gym/${query}`);
          queryclient.invalidateQueries({ queryKey: [query] });
        },
      }
    );
  }
  return (
    <div className="bg-slate-50 my-4 h-auto w-[90%] mx-auto rounded-xl p-4 flex flex-col gap-6">
      <header className="text-center w-auto text-2xl">
        New {query} exercise form
      </header>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="exercise_name">Exercise name:</label>
          <input
            id="exercise_name"
            type="text"
            placeholder="insert your exercise name..."
            className="p-2 w-full"
            required
            onChange={(e) => setExerciseName(e.target.value)}
          />
        </div>

        <div className="w-4/5 justify-between items-center flex m-auto">
          <button
            className="px-4 py-2 text-white bg-red-600/90 rounded-lg"
            onClick={() => router.back()}
          >
            Back
          </button>
          <button className="px-4 py-2 text-white bg-green-600/90 rounded-lg">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewExerciseForm;

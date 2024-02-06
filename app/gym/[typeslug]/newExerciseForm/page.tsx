"use client";

import { NewExercise } from "@/lib/ExerciseType";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

type NewExerciseFormProps = {
  params: {
    typeslug: string;
  };
};

function NewExerciseForm({ params }: NewExerciseFormProps) {
  const query = params.typeslug;
  const [exerciseName, setExerciseName] = useState("");
  const router = useRouter();
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!exerciseName) return;
    const newExercise: NewExercise = {
      exercise_name: exerciseName,
      slug: `${query}-exercise-${exerciseName.replaceAll(" ", "")}`,
    };

    console.log(newExercise);
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

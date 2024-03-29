"use client";

import { useCurrentUser } from "@/components/auth/hooks/useCurrentUser";
import { useAddExercise } from "@/components/exercises/hooks/useAddExercise";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NewExercise } from "@/lib/ExerciseType";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { FormEvent, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type NewExerciseFormProps = {
  params: {
    typeslug: string;
  };
};

function NewExerciseForm({ params }: NewExerciseFormProps) {
  const query = params.typeslug;
  const [exerciseName, setExerciseName] = useState("");
  const [unit, setUnit] = useState("reps");
  const metricRef = useRef(null);
  const router = useRouter();
  const { addExercise } = useAddExercise();
  const queryclient = useQueryClient();
  const { user } = useCurrentUser();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!exerciseName || !user) return;

    const metricValue = metricRef.current
      ? (metricRef.current as HTMLInputElement).value
      : "";

    const newExercise: NewExercise = {
      exercise_name: exerciseName,
      slug: `${exerciseName.replaceAll(" ", "_")}_${uuidv4()}`,
      owner: user.id,
      metric: metricValue,
      unit,
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
    <div className=" my-4 h-auto w-[90%] mx-auto rounded-sm p-4 flex flex-col gap-6">
      <header className="text-center w-auto text-2xl">
        New {query} exercise form
      </header>
      <form
        className="flex flex-wrap items-center justify-between gap-4 border px-2 py-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2 text-center w-full">
          <label htmlFor="exercise_name">Exercise name:</label>
          <Input
            id="exercise_name"
            type="text"
            placeholder="exercise name..."
            className="p-2 w-full"
            required
            onChange={(e) => setExerciseName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 text-center w-2/5">
          <label htmlFor="metric">Exercise metric:</label>
          <Input
            id="metric"
            type="text"
            placeholder="metric..."
            className="p-2 w-full"
            required
            ref={metricRef}
          />
        </div>
        <div className="flex flex-col gap-2 text-center w-2/5">
          <label htmlFor="unit">Exercise length:</label>
          <Select value={unit} onValueChange={(value) => setUnit(value)}>
            <SelectTrigger>
              <SelectValue placeholder="unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="reps">Repeats</SelectItem>
              <SelectItem value="mins">Minutes</SelectItem>
              <SelectItem value="secs">Seconds</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-4/5 justify-between items-center flex m-auto">
          <Button type="reset" onClick={() => router.back()}>
            Back
          </Button>
          <Button>Add</Button>
        </div>
      </form>
    </div>
  );
}

export default NewExerciseForm;

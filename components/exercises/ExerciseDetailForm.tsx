"use client";

import { ExerciseDataFormType } from "@/lib/ExerciseType";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { useAddExerciseData } from "./useAddExerciseData";
import { useQueryClient } from "@tanstack/react-query";

type ExerciseDetailFromProps = {
  type: string;
  slug: string;
  userId: string | undefined;
  open: (d: boolean) => void;
};

type Set = {
  set: number;
  rep: number;
};

const defaultSets = [
  { set: 0, rep: 0 },
  { set: 0, rep: 0 },
  { set: 0, rep: 0 },
];

const defaultCardioSets = [{ set: 0, rep: 0 }];
const set = {
  set: 0,
  rep: 0,
};
function ExerciseDetailForm({
  slug,
  userId,
  open,
  type,
}: ExerciseDetailFromProps) {
  const [sets, setSets] = useState<Set[]>(
    type === "cardio" ? defaultCardioSets : defaultSets
  );
  const [performances, setPerformances] = useState<number[]>([]);
  const [reps, setReps] = useState<number[]>([]);
  const { addExerciseData } = useAddExerciseData();
  const dataTable = `${type}Data`;
  const queryClient = useQueryClient();

  function handleAddSet(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setSets([...sets, set]);
  }

  function handleCalculateAvePerformance() {
    const sumOfPerformances = performances.reduce((acc, cur) => acc + cur, 0);
    const averagePerformancePerSet = Math.floor(
      sumOfPerformances / performances.length
    );

    return averagePerformancePerSet;
  }

  function handleCalculateAvgReps() {
    const sumOfReps = reps.reduce((acc, cur) => acc + cur, 0);
    const averageRepsPerSet = Math.floor(sumOfReps / reps.length);

    return averageRepsPerSet;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const avgPerform = handleCalculateAvePerformance();
    const avgReps = handleCalculateAvgReps();
    const date = new Date().toLocaleString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });

    if (!avgPerform || !avgReps || !date) return;
    const newExerciseData: ExerciseDataFormType = {
      userId,
      exercise: slug,
      date: date,
      avg_performance: avgPerform,
      avg_reps: avgReps,
    };

    addExerciseData(
      { newExerciseData, dataTable },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [dataTable] });
          open(false);
        },
      }
    );
  }
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <label htmlFor="powerLevel">Performances: </label>
          {type !== "cardio" && (
            <button type="button" onClick={handleAddSet}>
              <CiSquarePlus className="text-3xl" />
            </button>
          )}
        </div>
        {type === "cardio" || type === "core"
          ? sets.map((set, i) => (
              <div key={i} className="flex gap-2 items-center justify-between">
                <label htmlFor={`set_${i}`}>{`Set ${i + 1}`}: </label>
                <input
                  id={`set_${i}`}
                  type="number"
                  className="p-2 w-2/4"
                  placeholder={`body weight`}
                  onBlur={(e) =>
                    setPerformances([...performances, +e.target.value])
                  }
                />
                x
                <input
                  id={`set_${i}`}
                  type="number"
                  className="p-2 w-1/4"
                  placeholder="mins"
                  onBlur={(e) => setReps([...reps, +e.target.value])}
                />
              </div>
            ))
          : sets.map((set, i) => (
              <div key={i} className="flex gap-2 items-center justify-between">
                <label htmlFor={`set_${i}`}>{`Set ${i + 1}`}: </label>
                <input
                  id={`set_${i}`}
                  type="number"
                  className="p-2 w-2/4"
                  placeholder={`weight`}
                  onBlur={(e) =>
                    setPerformances([...performances, +e.target.value])
                  }
                />
                x
                <input
                  id={`set_${i}`}
                  type="number"
                  className="p-2 w-1/4"
                  placeholder="unit"
                  onBlur={(e) => setReps([...reps, +e.target.value])}
                />
              </div>
            ))}
      </div>

      <div className="w-4/5 justify-between items-center flex m-auto">
        <button
          className="px-4 py-2 text-white bg-red-600 rounded-lg"
          onClick={() => open(false)}
        >
          Close
        </button>
        <button className="px-4 py-2 text-white bg-green-400 rounded-lg">
          Add
        </button>
      </div>
    </form>
  );
}

export default ExerciseDetailForm;

"use client";

import { ExerciseDataFormType } from "@/lib/ExerciseType";
import React, { FormEvent, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { useAddExerciseData } from "./useAddExerciseData";
import { useQueryClient } from "@tanstack/react-query";
import { BiMinusCircle } from "react-icons/bi";
import { useReadUser } from "../user/useReadUser";

type ExerciseDetailFromProps = {
  type: string;
  slug: string;
  userId: string | undefined;
  open: (d: boolean) => void;
};

type Set = {
  id: number;
  set: number;
  rep: number;
};

const defaultSets = [
  { id: Math.random(), set: 0, rep: 0 },
  { id: Math.random(), set: 0, rep: 0 },
  { id: Math.random(), set: 0, rep: 0 },
];

const defaultCardioSets = [{ id: Math.random(), set: 0, rep: 0 }];

const set = {
  id: Math.random(),
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
  const [unit, setUnit] = useState("reps");

  const { userData } = useReadUser();

  const { addExerciseData } = useAddExerciseData();
  const dataTable = `${type}Data`;
  const queryClient = useQueryClient();

  function handleAddSet(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setSets([...sets, set]);
  }

  function handleUpdatePerformance(
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) {
    e.preventDefault();

    const newValue = parseFloat(e.target.value);
    if (isNaN(newValue)) return;

    const updatedSets = sets.map((set) => {
      if (set.id === id) {
        return { ...set, set: newValue };
      }
      return set;
    });

    setSets(updatedSets);
  }

  function handleUpdateReps(
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) {
    e.preventDefault();

    const newValue = parseFloat(e.target.value);
    if (isNaN(newValue)) return;

    const updatedSets = sets.map((set) => {
      if (set.id === id) {
        return { ...set, rep: newValue };
      }
      return set;
    });

    setSets(updatedSets);
  }

  function handleDeleteSet(e: React.MouseEvent<HTMLButtonElement>, id: number) {
    e.preventDefault();
    setSets(sets.filter((set) => set.id !== id));
  }

  function handleCalculateAvePerformance() {
    const sumOfPerformances = sets.reduce((acc, cur) => acc + cur.set, 0);
    const averagePerformancePerSet = Math.floor(
      sumOfPerformances / sets.length
    );

    return averagePerformancePerSet;
  }

  function handleCalculateAvgReps() {
    const sumOfReps = sets.reduce((acc, cur) => acc + cur.rep, 0);
    const averageRepsPerSet = Math.floor(sumOfReps / sets.length);

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

    console.log(avgPerform, avgReps, date);
    if (!avgPerform || !avgReps || !date) return;
    const newExerciseData: ExerciseDataFormType = {
      userId,
      exerciseId: slug,
      date: date,
      avg_performance: avgPerform,
      avg_reps: avgReps,
      unit,
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
        <h4 className="text-center w-full">Performances</h4>
        <div className="flex justify-between flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <span>Length unit:</span>
            <select
              className="p-2 w-3/5"
              onChange={(e) => setUnit(e.target.value)}
            >
              <option value="reps">repeats</option>
              <option value="mins">minutes</option>
              <option value="secs">seconds</option>
              {type === "cardio" && <option value="floors">floors</option>}
            </select>
            {type !== "cardio" && (
              <button type="button" onClick={handleAddSet}>
                <CiSquarePlus className="text-3xl" />
              </button>
            )}
          </div>
          <div className="flex items-center justify-between">
            {/* <div className="w-3/5 flex gap-4 items-center">
              <span>Body weight?</span>
              <input
                type="checkbox"
                className="w-5 h-5"
                checked={bodyWeight}
                onChange={(e) => setBodyWeight(e.target.checked)}
              />{" "}
            </div> */}
          </div>
        </div>
        {type === "cardio"
          ? sets.map((set, i) => (
              <div
                key={set.id}
                className="flex gap-2 items-center justify-between"
              >
                <input
                  id={`set_${i}`}
                  type="number"
                  className="p-2 w-2/4 my-2"
                  required
                  placeholder={`distance`}
                  onChange={(e) => handleUpdatePerformance(e, set.id)}
                />
                x
                <input
                  id={`set_${i}`}
                  type="number"
                  className="p-2 w-1/4"
                  required
                  placeholder={unit}
                  onChange={(e) => handleUpdateReps(e, set.id)}
                />
              </div>
            ))
          : sets.map((set, i) => (
              <div
                key={set.id}
                className="flex gap-2 items-center justify-between"
              >
                <label htmlFor={`set_${i}`}>{`${i + 1}`}: </label>
                <input
                  id={`set_${i}`}
                  type="number"
                  className="p-2 w-2/4 my-2"
                  placeholder={`weight`}
                  required
                  onChange={(e) => handleUpdatePerformance(e, set.id)}
                />
                x
                <input
                  id={`set_${i}`}
                  type="number"
                  className="p-2 w-1/4"
                  required
                  placeholder={unit}
                  onChange={(e) => handleUpdateReps(e, set.id)}
                />
                <button onClick={(e) => handleDeleteSet(e, set.id)}>
                  <BiMinusCircle className="text-red-500 text-2xl" />
                </button>
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

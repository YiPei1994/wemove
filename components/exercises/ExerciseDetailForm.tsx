"use client";

import { ExerciseDataFormType } from "@/lib/ExerciseType";
import React, { FormEvent, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { useAddExerciseData } from "./useAddExerciseData";
import { useQueryClient } from "@tanstack/react-query";
import { BiMinusCircle } from "react-icons/bi";
import { useReadUser } from "../user/useReadUser";
import { v4 as uuidv4 } from "uuid";

type ExerciseDetailFromProps = {
  type: string;
  slug: string;
  userId: string | undefined;
  open: (d: boolean) => void;
};

type Set = {
  id: string;
  set: number;
  rep: number;
};

const defaultSets = [
  { id: uuidv4(), set: 0, rep: 0 },
  { id: uuidv4(), set: 0, rep: 0 },
  { id: uuidv4(), set: 0, rep: 0 },
];

const defaultCardioSets = [{ id: uuidv4(), set: 0, rep: 0 }];

const set = {
  id: uuidv4(),
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
  const [allReps, setAllReps] = useState(0);
  const [allWeights, setAllWeights] = useState(0);

  const { addExerciseData } = useAddExerciseData();
  const dataTable = `${type}Data`;
  const queryClient = useQueryClient();

  function handleAddSet(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setSets([...sets, { id: uuidv4(), set: 0, rep: 0 }]);
  }

  function handleUpdatePerformance(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
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
    id: string
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

  function handleDeleteSet(e: React.MouseEvent<HTMLButtonElement>, id: string) {
    e.preventDefault();
    setSets(sets.filter((set) => set.id !== id));
  }

  function handleUseBodyweight(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!allWeights) return;
    const updatedSets = sets.map((set) => {
      return { ...set, set: allWeights };
    });
    set.set = allWeights;
    setSets(updatedSets);
  }
  function handleSetAllReps(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!allReps) return;
    const updatedSets = sets.map((set) => {
      return { ...set, rep: allReps };
    });
    set.rep = allReps;
    setSets(updatedSets);
  }

  function handleCalculateAvePerformance() {
    const sumOfPerformances = sets.reduce((acc, cur) => acc + cur.set, 0);
    const averagePerformancePerSet = (sumOfPerformances / sets.length).toFixed(
      2
    );

    return averagePerformancePerSet;
  }

  function handleCalculateAvgReps() {
    const sumOfReps = sets.reduce((acc, cur) => acc + cur.rep, 0);
    const averageRepsPerSet = (sumOfReps / sets.length).toFixed(2);

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
      exerciseId: slug,
      date: date,
      avg_performance: +avgPerform,
      avg_reps: +avgReps,
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
    <form
      className="flex flex-col gap-4 border border-[#ffe4e3] px-2 py-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2">
        <h4 className="text-center w-full">Performances</h4>
        <div className="flex justify-between flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <span>Length:</span>
            <select
              className="px-2 py-1 w-3/5"
              onChange={(e) => setUnit(e.target.value)}
            >
              <option value="reps">repeats</option>
              <option value="mins">minutes</option>
              <option value="secs">seconds</option>
              {type === "cardio" && <option value="floors">floors</option>}
            </select>
            {type !== "cardio" && (
              <button type="button" onClick={handleAddSet}>
                <CiSquarePlus className="text-3xl text-[#53B9C7] " />
              </button>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 w-1/2">
              <input
                className="w-1/3 px-2"
                type="number"
                value={allWeights === 0 ? "" : allWeights}
                onChange={(e) => setAllWeights(+e.target.value)}
              />
              <button
                className="text-[#53B9C7] py-1 px-1 border-[#53B9C7] border active:text-[#FFE4E3] active:border-[#FFE4E3] active:bg-[#53B9C7] hover:text-[#FFE4E3] hover:border-[#FFE4E3] hover:bg-[#53B9C7] rounded-sm"
                onClick={handleUseBodyweight}
              >
                All weight{" "}
              </button>
            </div>

            <div className="flex gap-2  w-1/2">
              <input
                className="w-1/3 px-2"
                type="number"
                value={allReps === 0 ? "" : allReps}
                onChange={(e) => setAllReps(+e.target.value)}
              />
              <button
                className="text-[#53B9C7] py-1 px-1 border-[#53B9C7] border active:text-[#FFE4E3] active:border-[#FFE4E3] active:bg-[#53B9C7] hover:text-[#FFE4E3] hover:border-[#FFE4E3] hover:bg-[#53B9C7] rounded-sm"
                onClick={handleSetAllReps}
              >
                All length
              </button>
            </div>
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
                  className="px-2 py-1 w-2/4 my-2"
                  required
                  value={set.set === 0 ? "" : set.set}
                  onChange={(e) => handleUpdatePerformance(e, set.id)}
                />
                x
                <input
                  id={`set_${i}`}
                  type="number"
                  className="px-2 py-1 w-1/4"
                  required
                  value={set.rep === 0 ? "" : set.rep}
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
                  className="px-2 py-1 w-2/4 my-2"
                  value={set.set === 0 ? "" : set.set}
                  required
                  onChange={(e) => handleUpdatePerformance(e, set.id)}
                />
                x
                <input
                  id={`set_${i}`}
                  type="number"
                  className="px-2 py-1 w-1/4"
                  required
                  value={set.rep === 0 ? "" : set.rep}
                  onChange={(e) => handleUpdateReps(e, set.id)}
                />
                <button onClick={(e) => handleDeleteSet(e, set.id)}>
                  <BiMinusCircle className="text-2xl text-[#53B9C7] " />
                </button>
              </div>
            ))}
      </div>

      <div className="w-4/5 justify-between items-center flex m-auto">
        <button
          className="px-6 py-1 w-auto bg-[#53B9C7] rounded-sm"
          onClick={() => open(false)}
        >
          Close
        </button>
        <button className="px-6 py-1 w-auto bg-[#53B9C7] rounded-sm">
          Add
        </button>
      </div>
    </form>
  );
}

export default ExerciseDetailForm;

"use client";

import { ExerciseDataFormType, ExerciseType } from "@/lib/ExerciseType";
import React, { FormEvent, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { useAddExerciseData } from "./useAddExerciseData";
import { useQueryClient } from "@tanstack/react-query";
import { BiMinusCircle } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import { MdTimer } from "react-icons/md";
import { GiStrong } from "react-icons/gi";

type ExerciseDetailFromProps = {
  type: string;
  slug: string;
  userId: string | undefined;
  exercise: ExerciseType;
  open: (d: boolean) => void;
};

type Set = {
  id: string;
  weight: number;
  rep: number;
};

const set = {
  id: uuidv4(),
  weight: 0,
  rep: 0,
};
const defaultSets = [
  {
    id: uuidv4(),
    weight: 0,
    rep: 0,
  },
  {
    id: uuidv4(),
    weight: 0,
    rep: 0,
  },
  {
    id: uuidv4(),
    weight: 0,
    rep: 0,
  },
];

const defaultCardioSets = [
  {
    id: uuidv4(),
    weight: 0,
    rep: 0,
  },
];

function ExerciseDetailForm({
  slug,
  userId,
  open,
  type,
  exercise,
}: ExerciseDetailFromProps) {
  const [sets, setSets] = useState<Set[]>(
    type === "cardio" ? defaultCardioSets : defaultSets
  );
  const [allWeights, setAllWeights] = useState(0);
  const [allReps, setAllReps] = useState(0);

  const { addExerciseData } = useAddExerciseData();
  const dataTable = `${type}Data`;
  const queryClient = useQueryClient();

  function handleAddSet(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setSets([
      ...sets,
      {
        id: uuidv4(),
        weight: 0,
        rep: 0,
      },
    ]);
  }

  function handleUpdatePerformance(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) {
    e.preventDefault();

    const newValue = e.target.value === "" ? 0 : parseFloat(e.target.value);
    if (isNaN(newValue)) return;

    const updatedSets = sets.map((set) => {
      if (set.id === id) {
        return { ...set, weight: newValue };
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

    const newValue = e.target.value === "" ? 0 : parseFloat(e.target.value);
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
      return { ...set, weight: allWeights };
    });

    setSets(updatedSets);
  }
  function handleSetAllReps(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!allReps) return;
    const updatedSets = sets.map((set) => {
      return { ...set, rep: allReps };
    });

    setSets(updatedSets);
  }

  function handleCalculateAvePerformance() {
    const sumOfPerformances = sets.reduce((acc, cur) => acc + cur.weight, 0);
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
          <div className="flex items-center justify-center gap-4">
            <button type="button" onClick={handleAddSet}>
              <CiSquarePlus className="text-5xl text-[#53B9C7] " />
            </button>
          </div>
          <div className="flex items-center justify-between w-full gap-4">
            <div className="flex justify-center w-1/2 gap-2">
              <input
                id="allmetric"
                className="w-3/5 px-2"
                type="number"
                placeholder={`all ${exercise.metric}`}
                onChange={(e) => setAllWeights(+e.target.value)}
              />
              <button
                className="text-[#53B9C7] py-1 px-1 text-xl border-[#53B9C7] border active:text-[#FFE4E3] active:border-[#FFE4E3] active:bg-[#53B9C7] hover:text-[#FFE4E3] hover:border-[#FFE4E3] hover:bg-[#53B9C7] rounded-sm"
                onClick={handleUseBodyweight}
              >
                <GiStrong />
              </button>
            </div>

            <div className="flex justify-center  w-1/2 gap-2">
              <button
                className="text-[#53B9C7] py-1 px-1 text-xl  border-[#53B9C7] border active:text-[#FFE4E3] active:border-[#FFE4E3] active:bg-[#53B9C7] hover:text-[#FFE4E3] hover:border-[#FFE4E3] hover:bg-[#53B9C7] rounded-sm"
                onClick={handleSetAllReps}
              >
                <MdTimer />
              </button>
              <input
                className="w-3/5 px-2"
                type="number"
                id="allunit"
                placeholder={`all ${exercise.unit}`}
                onChange={(e) => setAllReps(+e.target.value)}
              />
            </div>
          </div>
        </div>
        {sets.map((set, i) => (
          <div key={set.id} className="flex gap-2 items-center justify-between">
            <label className="w-1/4" htmlFor={`set_${i}_metric`}>
              {`Set ${i + 1}`}:{" "}
            </label>
            <input
              id={`set_${i}_metric`}
              type="number"
              className="px-2 py-1 w-1/4 my-2"
              placeholder={exercise.metric}
              value={set.weight === 0 ? "" : set.weight}
              required
              onChange={(e) => handleUpdatePerformance(e, set.id)}
            />
            x
            <input
              id={`set_${i}_unit`}
              type="number"
              className="px-2 py-1 w-1/4"
              placeholder={exercise.unit}
              value={set.rep === 0 ? "" : set.rep}
              required
              onChange={(e) => handleUpdateReps(e, set.id)}
            />
            <button onClick={(e) => handleDeleteSet(e, set.id)}>
              <BiMinusCircle className="text-2xl text-[#53B9C7]" />
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

"use client";

import { ExerciseDataFormType, ExerciseType } from "@/lib/ExerciseType";
import React, { FormEvent, useEffect, useState } from "react";
import { useAddExerciseData } from "./hooks/useAddExerciseData";
import { useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { HiOutlineTrash } from "react-icons/hi2";

import { HiOutlinePlus } from "react-icons/hi2";
import { HiOutlineChartBar } from "react-icons/hi2";
import { HiOutlineTrophy } from "react-icons/hi2";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { toast } from "../ui/use-toast";
import { useDisplayExerciseDataForm } from "@/store/useDisplayExerciseDataForm";

type ExerciseDetailFromProps = {
  type: string;
  slug: string;
  userId: string | undefined;
  exercise: ExerciseType;
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
  const { displayExerciseDataForm, toggleDisplayExerciseDataForm } =
    useDisplayExerciseDataForm();

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

  useEffect(() => {
    const handleAllWeights = () => {
      const updatedSets = sets.map((set) => {
        return { ...set, weight: allWeights };
      });

      setSets(updatedSets);
    };
    handleAllWeights();
  }, [allWeights]);

  useEffect(() => {
    const handleAllReps = () => {
      const updatedSets = sets.map((set) => {
        return { ...set, rep: allReps };
      });

      setSets(updatedSets);
    };
    handleAllReps();
  }, [allReps]);

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
          toast({
            description: "Exercise data added!",
          });
          queryClient.invalidateQueries({ queryKey: [dataTable] });
          toggleDisplayExerciseDataForm(false);
        },
      }
    );
  }
  return (
    <Dialog
      open={displayExerciseDataForm}
      onOpenChange={toggleDisplayExerciseDataForm}
    >
      <Button onClick={() => toggleDisplayExerciseDataForm()}>Track</Button>{" "}
      <DialogContent className="w-[90%] mx-auto">
        <DialogHeader>
          <DialogTitle>Exercise data</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-4  px-2 py-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <div className="flex justify-between flex-col gap-4">
              <div className="flex items-center justify-center gap-4">
                <button type="button" onClick={handleAddSet}>
                  <HiOutlinePlus className="text-5xl text-primary border-accent border p-1 rounded-lg" />
                </button>
              </div>
              <div className="flex items-center justify-between w-full gap-4">
                <div className="flex justify-center w-1/2 gap-4 items-center">
                  <HiOutlineTrophy className="text-primary  text-2xl" />
                  <Input
                    id="allmetric"
                    className="w-3/5 px-2"
                    type="number"
                    placeholder={`all ${exercise.metric}`}
                    onChange={(e) => setAllWeights(+e.target.value)}
                  />
                </div>

                <div className="flex justify-center  w-1/2 gap-4 items-center">
                  <HiOutlineChartBar className="text-primary text-2xl" />
                  <Input
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
              <div
                key={set.id}
                className="flex gap-2 items-center justify-between"
              >
                <label className="w-1/4" htmlFor={`set_${i}_metric`}>
                  {`Set ${i + 1}`}:{" "}
                </label>
                <Input
                  id={`set_${i}_metric`}
                  type="number"
                  className="px-2 py-1 w-1/4 my-2"
                  placeholder={exercise.metric}
                  value={set.weight === 0 ? "" : set.weight}
                  required
                  onChange={(e) => handleUpdatePerformance(e, set.id)}
                />
                x
                <Input
                  id={`set_${i}_unit`}
                  type="number"
                  className="px-2 py-1 w-1/4"
                  placeholder={exercise.unit}
                  value={set.rep === 0 ? "" : set.rep}
                  required
                  onChange={(e) => handleUpdateReps(e, set.id)}
                />
                <button onClick={(e) => handleDeleteSet(e, set.id)}>
                  <HiOutlineTrash className="text-2xl text-primary" />
                </button>
              </div>
            ))}
          </div>

          <div className="w-4/5 justify-center items-center flex m-auto">
            <Button>Save training data</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ExerciseDetailForm;

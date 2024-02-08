"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { MdCalculate } from "react-icons/md";
import { useReadUser } from "../user/useReadUser";
type ExerciseDetailFromProps = {
  type: string;
  slug: string;
  userId: string | undefined;
};

function ExerciseDetailForm({ type, slug, userId }: ExerciseDetailFromProps) {
  const router = useRouter();
  const { userData, isLoading } = useReadUser();
  const { weight } = userData || {};
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  function onSubmit() {}
  function handleCalculatePowerLevel() {}
  return (
    <>
      <header>{slug}</header>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <label htmlFor="performance">Performance:</label>
          <input
            id="performance"
            type="number"
            placeholder="insert your performance..."
            className="p-2 w-full"
            {...register("performance")}
          />
          {errors.performance && (
            <p className="text-red-500">{`${errors.performance.message}`} </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="unit">Exercise unit: </label>

          <select className="p-2 w-full" id="unit" {...register("unit")}>
            <option>Select exercise unit</option>
            <option value="kg">Kgs</option>
            <option value="rep">Reps</option>
          </select>

          {errors.unit && (
            <p className="text-red-500">{`${errors.unit.message}`} </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <label htmlFor="powerLevel">Power level:</label>
            <button type="button" onClick={handleCalculatePowerLevel}>
              <MdCalculate className="text-3xl" />
            </button>
          </div>
          <input
            id="powerLevel"
            type="number"
            placeholder="Calculate by clicking on icon..."
            readOnly
            className="p-2 w-full"
            {...register("powerLevel")}
          />
          {errors.powerLevel && (
            <p className="text-red-500">{`${errors.powerLevel.message}`} </p>
          )}
        </div>

        <div className="w-4/5 justify-between items-center flex m-auto">
          <button
            className="px-4 py-2 text-white bg-red-600 rounded-lg"
            onClick={() => router.back()}
          >
            Back
          </button>
          <button className="px-4 py-2 text-white bg-green-400 rounded-lg">
            Add
          </button>
        </div>
      </form>
    </>
  );
}

export default ExerciseDetailForm;

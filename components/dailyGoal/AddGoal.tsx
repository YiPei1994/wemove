"use client";

import { UserGoalType } from "@/lib/DailyGoalsType";
import React from "react";
import { useForm } from "react-hook-form";
import { useCurrentUser } from "../auth/useCurrentUser";
import { useCreateUserGoal } from "./hooks/useCreateUserGoal";
import { useQueryClient } from "@tanstack/react-query";
import { useDisplayAddGoal } from "@/store/useDisplayAddGoal";
import { formatDate } from "@/helpers/functions";
import { LOCALE, NOW } from "@/helpers/constants";
import { HiOutlineDocumentPlus } from "react-icons/hi2";

type Data = {
  goal: string;
  daily: boolean;
  description: string;
};
function AddGoal() {
  const { register, handleSubmit, reset } = useForm<Data>();
  const { user } = useCurrentUser();
  const { creatingGoal } = useCreateUserGoal();
  const queryClient = useQueryClient();
  const { displayAddGoal, toggleDisplayAddGoal } = useDisplayAddGoal();

  function handleNewGoal() {
    toggleDisplayAddGoal();
  }

  function onSubmit(data: Data) {
    if (!data || !user) return;

    const newGoal: UserGoalType = {
      date: String(formatDate(LOCALE, NOW)),
      goal: data.goal,
      description: data.description,
      daily: data.daily,
      status: false,
      userId: user.id,
    };

    creatingGoal(newGoal, {
      onSuccess: () => {
        reset();
        queryClient.invalidateQueries({ queryKey: ["dailyGoals"] });
      },
    });
  }
  return (
    <>
      <button
        onClick={handleNewGoal}
        className="w-full flex gap-4 items-center justify-center text-center p-4 uppercase bg-[#53B9C7] text-xl text-[#FFE4E3]"
      >
        <span>Add goal</span> <HiOutlineDocumentPlus />
      </button>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${
          displayAddGoal
            ? "max-h-[250px] opacity-100 pointer-events-auto py-4"
            : "max-h-[0px] opacity-0 pointer-events-none py-0"
        } transition-all duration-300 flex flex-wrap items-center justify-between gap-4 border border-[#ffe4e3] px-2 `}
      >
        <div className="w-full flex gap-2 justify-between items-center">
          <input
            placeholder="new goal..."
            type="text"
            id="goal"
            required
            className="p-2"
            {...register("goal")}
          />
          <div className="flex items-center gap-1">
            <label htmlFor="daily">Daily:</label>
            <input
              className="w-8 h-10"
              type="checkbox"
              id="daily"
              {...register("daily")}
            />
          </div>
        </div>
        <textarea
          className="p-2 w-full"
          placeholder="detail description..."
          id="description"
          {...register("description")}
        ></textarea>
        <div className="w-4/5 justify-between items-center flex m-auto">
          <button
            className="px-6 py-1 w-auto bg-[#53B9C7] rounded-sm "
            type="reset"
            onClick={() => toggleDisplayAddGoal(false)}
          >
            Close
          </button>
          <button className="px-6 py-1 w-auto bg-[#53B9C7] rounded-sm">
            Add
          </button>
        </div>
      </form>
    </>
  );
}

export default AddGoal;

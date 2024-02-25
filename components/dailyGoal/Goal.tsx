import { UserGoalType } from "@/lib/DailyGoalsType";
import React from "react";
import { HiOutlineCheck } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi2";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { useDeleteGoal } from "./hooks/useDeleteGoal";
import { useQueryClient } from "@tanstack/react-query";
import { useCompleteGoal } from "./hooks/useCompleteGoal";

type GoalProps = {
  type: "finished" | "unfinished" | "daily";
  goal: UserGoalType;
};

function Goal({ goal: userGoal, type }: GoalProps) {
  const { id, goal, description, status, userId, date, daily } = userGoal;
  const queryClient = useQueryClient();
  const { deletingGoal } = useDeleteGoal();
  const { completingGoal } = useCompleteGoal();

  function handleComplete() {
    const newGoal: UserGoalType = {
      goal,
      description,
      status,
      userId,
      date,
      daily,
    };
    if (!newGoal || !id || type === "finished") return;
    completingGoal(
      { newGoal, type, id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["dailyGoals"],
          });
          queryClient.invalidateQueries({ queryKey: ["completedGoals"] });
        },
      }
    );
  }
  function handleDelete() {
    if (!userId || !id) return;
    deletingGoal(
      { type, userId, id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["dailyGoals"],
          });
          queryClient.invalidateQueries({ queryKey: ["completedGoals"] });
        },
      }
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between px-3 py-4">
        {" "}
        <div className="flex gap-2 items-center truncate">
          <HiOutlineCalendarDays className="text-2xl" /> <span>{goal} </span>
        </div>
        <div className="flex gap-4">
          {type !== "finished" && (
            <button className="text-3xl " onClick={handleComplete}>
              <HiOutlineCheck />
            </button>
          )}
          <button className="text-3xl " onClick={handleDelete}>
            <HiOutlineTrash />
          </button>
        </div>
      </div>
      <div className="pl-6">{description}</div>
    </div>
  );
}

export default Goal;

import { GoalType } from "@/lib/DailyGoalsType";
import supabase from "./supabase";
import { boolean } from "zod";

/**** creating daily Goal ******/
export const createUserGoal = async (goal: GoalType) => {
  const { data, error } = await supabase
    .from(goal.daily === true ? "permGoals" : "tempGoals")
    .insert([{ ...goal }])
    .select();

  if (error) {
    throw new Error(error.message || "Unable to add new goal.");
  }

  return data as GoalType[];
};

/******** fetch all temporary goals belongs to user *********/
export const fetchTempGoals = async (userId: string | undefined) => {
  if (!userId) return;
  const { data, error } = await supabase
    .from("tempGoals")
    .select("*")
    .eq("userId", userId);

  if (error) {
    throw new Error(error.message || "No goals found.");
  }

  if (!data || data.length === 0) {
    return null;
  }
  const sortedData = data.sort((a, b) => a.goal_id - b.goal_id);
  return sortedData as GoalType[];
};

/******** fetch all permanent goals belongs to user *********/
export const fetchPermGoals = async (userId: string | undefined) => {
  if (!userId) return;
  const { data, error } = await supabase
    .from("permGoals")
    .select("*")
    .eq("userId", userId);

  if (error) {
    throw new Error(error.message || "No goals found.");
  }

  if (!data || data.length === 0) {
    return null;
  }

  const sortedData = data.sort((a, b) => a.goal_id - b.goal_id);
  return sortedData as GoalType[];
};

/*** toggle goal to complete *******/
export const completeTemp = async (
  goalId: number,
  status: boolean,
  userId: string
) => {
  const { data, error } = await supabase
    .from("tempGoals")
    .update({ status: status })
    .eq("goal_id", goalId)
    .eq("userId", userId)
    .select();

  if (error) {
    throw new Error(error.message || "Unable to update status.");
  }

  return data as GoalType[];
};
export const completePerm = async (
  goalId: number,
  status: boolean,
  userId: string,
  date: string | undefined
) => {
  try {
    // Check if date is provided
    if (!date) {
      const { data: updateWithoutDate, error: errorWithoutDate } =
        await supabase
          .from("permGoals")
          .update({ status: status })
          .eq("goal_id", goalId)
          .eq("userId", userId)
          .select();

      if (errorWithoutDate) {
        throw new Error(errorWithoutDate.message || "Unable to update status.");
      }

      return updateWithoutDate;
    } else {
      const { data: updateWithDate, error: errorWithDate } = await supabase
        .from("permGoals")
        .update({ status: status, date: date })
        .eq("goal_id", goalId)
        .eq("userId", userId)
        .select();

      if (errorWithDate) {
        throw new Error(errorWithDate.message || "Unable to update status.");
      }

      return updateWithDate;
    }
  } catch (error: any) {
    throw new Error(
      error.message || "An error occurred while updating status."
    );
  }
};

/************** delete goal ***********/
export const deleteGoal = async (
  goalId: number | undefined,
  daily: boolean,
  userId: string
) => {
  if (!userId) return;
  const { error } = await supabase
    .from(daily === true ? "permGoals" : "tempGoals")
    .delete()
    .eq("goal_id", goalId)
    .eq("userId", userId);

  if (error) {
    throw new Error(error.message || "Unable to delete the goal.");
  }
};

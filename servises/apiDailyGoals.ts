import { UserDayType, UserGoalType } from "@/lib/DailyGoalsType";
import supabase from "./supabase";

/**** creating daily Goal ******/
export const createUserGoal = async (goal: UserGoalType) => {
  const { data, error } = await supabase
    .from("dailyGoals")
    .insert([{ ...goal }])
    .select();

  if (error) {
    throw new Error(error.message || "Unable to add new goal.");
  }

  return data as UserGoalType[];
};

/**** fetch all goals belongs to user *************/
export const getDailyGoals = async (
  userId: string | undefined,
  type: "daily" | "unfinished" | "finished",
  date?: string
): Promise<UserGoalType[]> => {
  if (!userId) {
    throw new Error("User ID is required.");
  }

  let query;

  switch (type) {
    case "daily":
      query = supabase
        .from("dailyGoals")
        .select("*")
        .eq("userId", userId)
        .eq("daily", true);
      break;
    case "unfinished":
      if (!date) {
        throw new Error("Date is required for type 'unfinished'.");
      }
      query = supabase
        .from("dailyGoals")
        .select("*")
        .eq("userId", userId)
        .eq("date", date)
        .eq("daily", false);
      break;
    case "finished":
      if (!date) {
        throw new Error("Date is required for type 'finished'.");
      }
      query = supabase
        .from("completedGoals")
        .select("*")
        .eq("date", date)
        .eq("userId", userId);
      break;
    default:
      throw new Error("Invalid type provided.");
  }

  try {
    const { data, error } = await query;

    if (error) {
      throw new Error(error.message || "Error fetching goals.");
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred while fetching goals.");
  }
};

/*** add goal to complete *******/

export const addCompleteGoal = async (
  newGoal: UserGoalType,
  type: "daily" | "unfinished",
  id?: number // Optional, only required for "unfinished" type
): Promise<UserGoalType[]> => {
  if (type === "daily") {
    const { data, error } = await supabase
      .from("completedGoals")
      .insert([{ ...newGoal }])
      .select();

    if (error) {
      throw new Error(error.message || "Unable to complete goal");
    }

    return data as UserGoalType[];
  } else if (type === "unfinished" && id !== undefined) {
    // Delete goal from dailyGoals
    const { error: deleteError } = await supabase
      .from("dailyGoals")
      .delete()
      .eq("userId", newGoal.userId)
      .eq("id", id);

    if (deleteError) {
      throw new Error(
        deleteError.message || "Unable to delete goal from dailyGoals"
      );
    }

    // Insert goal into completedGoals
    const { data, error: insertError } = await supabase
      .from("completedGoals")
      .insert([{ ...newGoal }])
      .select();

    if (insertError) {
      throw new Error(insertError.message || "Unable to complete goal");
    }

    return data as UserGoalType[];
  } else {
    throw new Error("Invalid type or missing ID");
  }
};

/************** delete goal ***********/

export const deleteGoal = async (
  type: "unfinished" | "finished" | "daily",
  userId: string,
  id: number
) => {
  if (!id) {
    throw new Error("Goal ID is required.");
  }

  let tableName: string;
  let errorMessage: string;

  switch (type) {
    case "unfinished":
      tableName = "dailyGoals";
      errorMessage = "Unable to delete unfinished goal.";
      break;
    case "finished":
      tableName = "completedGoals";
      errorMessage = "Unable to delete finished goal.";
      break;
    case "daily":
      tableName = "dailyGoals";
      errorMessage = "Unable to delete daily goal.";
      break;
    default:
      throw new Error("Invalid type provided.");
  }

  const { data, error } = await supabase
    .from(tableName)
    .delete()
    .eq("userId", userId)
    .eq("id", id);

  if (error) {
    throw new Error(error.message || errorMessage);
  }

  return data;
};

/**** creating Goal day ******/

export const createUserDay = async (day: UserDayType) => {
  const { data, error } = await supabase
    .from("userDays")
    .insert([{ ...day }])
    .select();

  if (error) {
    throw new Error(error.message || "Unable to add new day.");
  }
  return data as UserDayType[];
};

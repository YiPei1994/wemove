import {
  ExerciseDataFormType,
  ExerciseDataType,
  ExerciseType,
  NewExercise,
} from "@/lib/ExerciseType";
import supabase, { DEFAULT_USERID } from "./supabase";

export const getAllExercisesOfType = async (
  query: string,
  owner: string | undefined
) => {
  if (!owner) return;
  const { data, error } = await supabase
    .from(query)
    .select("*")
    .eq("owner", owner || DEFAULT_USERID);

  if (error) {
    throw new Error(error.message || "couldnt fetch this type");
  }

  return data as ExerciseType[];
};

export const getExerciseData = async (
  userId: string | undefined,
  exercise: string,
  exerciseData: string,
  type: string
) => {
  try {
    // Check if the table is empty
    if (!userId) {
      return [];
    }

    const { count: rowCount } = await supabase
      .from(exerciseData)
      .select("data_id", { count: "exact" })
      .eq("userId", userId)
      .eq("exerciseId", exercise);

    if (rowCount === 0) {
      return []; // Return an empty array if the table is empty
    }

    if (type === "last") {
      const { data, error } = await supabase
        .from(exerciseData)
        .select()
        .eq("userId", userId)
        .eq("exerciseId", exercise)
        .order("data_id", { ascending: false })
        .limit(1);

      if (error) {
        throw new Error(error.message || "Couldn't find last exercise record.");
      }

      return data as ExerciseDataType[];
    } else if (type === "best") {
      const { data, error } = await supabase
        .from(exerciseData)
        .select()
        .eq("userId", userId)
        .eq("exerciseId", exercise)
        .order("avg_performance", { ascending: false })
        .limit(1);

      if (error) {
        throw new Error(error.message || "Couldn't find best exercise record.");
      }

      return data as ExerciseDataType[];
    } else if (type === "all") {
      const { data, error } = await supabase
        .from(exerciseData)
        .select("*")
        .eq("userId", userId)
        .eq("exerciseId", exercise)
        .order("data_id", { ascending: false })
        .limit(30);

      if (error) {
        throw new Error(error.message || "Couldn't find best exercise record.");
      }

      return data as ExerciseDataType[];
    }
  } catch (e: any) {
    console.error("Error in getExactExerciseData:", e.message);
    throw e;
  }
};

export const getExerciseByExerciseId = async (
  exercideId: string,
  query: string
) => {
  const { data, error } = await supabase
    .from(query)
    .select()
    .eq("slug", exercideId)
    .single();

  if (error) {
    throw new Error(error.message || "Could not find searched exercise.");
  }

  return (data as ExerciseType) || null;
};

export const addNewExercise = async (
  newExercise: NewExercise,
  query: string
) => {
  const existingRow = await supabase
    .from(query)
    .select()
    .eq("exercise_name", newExercise.exercise_name)
    .single();

  if (!existingRow.data) {
    const { data, error } = await supabase
      .from(query)
      .insert([{ ...newExercise }])
      .select();

    if (error) {
      throw new Error(error.message || "Could not create new exercise");
    }
    return data;
  } else {
    throw new Error("Exercise already exists.");
  }
};

export const addNewExerciseData = async (
  newExerciseData: ExerciseDataFormType,
  type: string
) => {
  const { data, error } = await supabase
    .from(type)
    .insert([{ ...newExerciseData }])
    .select();

  if (error) {
    throw new Error(error.message || "Could not add new Exercise Data");
  }
  return data;
};

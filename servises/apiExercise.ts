import {
  ExerciseDataType,
  ExerciseType,
  NewExercise,
} from "@/lib/ExerciseType";
import supabase from "./supabase";

export const getAllExercisesOfType = async (query: string) => {
  const { data, error } = await supabase.from(query).select("*");

  if (error) {
    throw new Error(error.message || "couldnt fetch this type");
  }

  return data as ExerciseType[];
};

export const getLastExerciseData = async (
  userId: string | undefined,
  exercise: string,
  exerciseData: string
) => {
  try {
    const { data, error } = await supabase
      .from(exerciseData)
      .select()
      .eq("userId", userId)
      .eq("exercise", exercise)
      .order("tracking_id", { ascending: false })
      .limit(1);

    if (error) {
      throw new Error(error.message || "Couldn't find last exercise record.");
    }

    const lastData: ExerciseDataType = data[0];

    return lastData;
  } catch (e: any) {
    console.error("Error in getExactExerciseData:", e.message);
    throw e;
  }
};

export const getBestExerciseData = async (
  userId: string | undefined,
  exercise: string,
  exerciseData: string
) => {
  try {
    const { data, error } = await supabase
      .from(exerciseData)
      .select()
      .eq("userId", userId)
      .eq("exercise", exercise)
      .order("performance", { ascending: false })
      .limit(1);

    if (error) {
      throw new Error(error.message || "Couldn't find best exercise record.");
    }

    const bestData: ExerciseDataType = data[0];

    return bestData;
  } catch (e: any) {
    console.error("Error in getBestExerciseData:", e.message);
    throw e;
  }
};

export const addNewExercise = async (
  newExercise: NewExercise,
  query: string
) => {
  console.log(newExercise, query);
  const existingRow = await supabase
    .from(query)
    .select()
    .eq("exercise_name", newExercise.exercise_name)
    .single();

  console.log(existingRow);
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

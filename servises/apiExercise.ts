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

export const getExactExerciseData = async (
  userId: string | undefined,
  exercise: string
) => {
  try {
    console.log(userId, exercise);
    const { data, error } = await supabase
      .from("chestData")
      .select()
      .eq("userId", userId)
      .eq("exercise", exercise);

    if (error) {
      throw new Error(error.message || "Couldn't find exercise record.");
    }
    console.log(data);
    const lastData: ExerciseDataType = data[0];
    return lastData;
  } catch (e: any) {
    console.error("Error in getExactExerciseData:", e.message);
    throw e;
  }
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

  if (!existingRow) {
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

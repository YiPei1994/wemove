import { ExerciseType } from "@/lib/ExerciseType";
import supabase from "./supabase";

export const getAllExercisesOfType = async (type: string) => {
  const { data, error } = await supabase.from(type).select("*");

  if (error) {
    throw new Error(error.message || "couldnt fetch this type");
  }

  return data as ExerciseType[];
};

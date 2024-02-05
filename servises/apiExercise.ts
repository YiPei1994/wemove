import { ExerciseDataType, ExerciseType } from "@/lib/ExerciseType";
import supabase from "./supabase";

export const getAllExercisesOfType = async (type: string) => {
  const { data, error } = await supabase.from(type).select("*");

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

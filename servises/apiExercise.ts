import { DEFAULT_USERID } from "@/helpers/constants";
import {
  ExerciseDataFormType,
  ExerciseDataType,
  ExerciseType,
  NewExerciseType,
} from "@/lib/ExerciseType";
import supabase from "./supabase";

/***** fetch all exercise from one type *******/
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

/***** fetch data from one exercise ******/
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
      /*** fetch last recorded data ******/
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
      /**** fetch best recorded data ******/
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
      /*** fetch last 30 recorded data */
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

/****** add new exercise ********/

export const addNewExercise = async (
  newExercise: NewExerciseType,
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
/******* add new data to specific exercise *********/
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

/**** fetch specific exercise using unique slugID */

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

/**** edit specifici exercise *********/
export const editExercise = async (
  editedExercise: ExerciseType,
  query: string
) => {
  const { data, error } = await supabase
    .from(query)
    .update({ ...editedExercise })
    .eq("exercise_id", editedExercise.exercise_id)
    .select();

  if (error) {
    throw new Error(error.message || "couldnt edit exercise");
  }

  return data as ExerciseType[];
};
/**** delete a specific exercise ********/

export const deleteExercise = async (query: string, id: number) => {
  const { data, error } = await supabase
    .from(query)
    .delete()
    .eq("exercise_id", id);

  if (error) {
    throw new Error(error.message || "unable to delete exercise");
  }
  return data;
};

/***** delete a specific exercise data *********/

export const deleteExerciseData = async (
  query: string,
  id: number,
  userId: string
) => {
  const { data, error } = await supabase
    .from(query)
    .delete()
    .eq("data_id", id)
    .eq("userId", userId);

  if (error) {
    throw new Error(error.message || "unable to delete exercise data");
  }
  return data;
};

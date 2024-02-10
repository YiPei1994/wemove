import { z } from "zod";

export type ExerciseType = {
  exercise_id: number;
  exercise_name: string;
  category: string;
  slug: string;
};

export type ExerciseDataType = {
  tracking_id: number;
  userId: string;
  exercise: string;
  date: string;
  avg_performance: string;
  avg_reps: number;
};

export type NewExercise = {
  exercise_name: string;
  slug: string;
};

export type ExerciseDataFormType = {
  userId: string | undefined;
  exercise: string;
  date: string;
  avg_performance: number;
  avg_reps: number;
};

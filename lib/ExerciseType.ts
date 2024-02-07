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
  performance: number;
  powerLevel: number;
  unit: string;
};

export type NewExercise = {
  exercise_name: string;
  slug: string;
};
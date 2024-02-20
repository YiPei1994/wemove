export type ExerciseType = {
  exercise_id: number;
  exercise_name: string;
  image: string;
  slug: string;
  unit: string;
  metric: string;
};

export type NewExercise = {
  exercise_name: string;
  slug: string;
  owner: string;
  unit: string;
  metric: string;
};

export type ExerciseDataType = {
  data_id: number;
  userId: string;
  exerciseId: string;
  date: string;
  avg_performance: string;
  avg_reps: number;
  unit: string;
};

export type ExerciseDataFormType = {
  userId: string | undefined;
  exerciseId: string;
  date: string;
  avg_performance: number;
  avg_reps: number;
};

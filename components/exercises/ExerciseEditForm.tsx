import { ExerciseType } from "@/lib/ExerciseType";
import React from "react";

type ExerciseEditFormProps = {
  exercise: ExerciseType;
};

function ExerciseEditForm({ exercise }: ExerciseEditFormProps) {
  if (!exercise) return;
  const { exercise_name, unit, metric } = exercise;
  return <div>ExerciseEditForm</div>;
}

export default ExerciseEditForm;

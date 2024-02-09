import { ExerciseDataFormType } from "@/lib/ExerciseType";
import { addNewExerciseData } from "@/servises/apiExercise";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAddExerciseData = () => {
  const { mutate: addExerciseData } = useMutation({
    mutationFn: ({
      newExerciseData,
      dataTable,
    }: {
      newExerciseData: ExerciseDataFormType;
      dataTable: string;
    }) => addNewExerciseData(newExerciseData, dataTable),
    onSuccess: () => {
      toast.success("Sucssesfully added.");
    },
    onError: (err) => toast.error(err.message),
  });

  return { addExerciseData };
};

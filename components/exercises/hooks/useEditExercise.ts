import { ExerciseType } from "@/lib/ExerciseType";
import { editExercise } from "@/servises/apiExercise";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useEditExercise = () => {
  const { mutate: editingExercise } = useMutation({
    mutationFn: ({
      editedExercise,
      query,
    }: {
      editedExercise: ExerciseType;
      query: string;
    }) => editExercise(editedExercise, query),
    onSuccess: () => {
      toast.success("Update success!");
    },
    onError: (err) => toast.error(err.message),
  });
  return { editingExercise };
};

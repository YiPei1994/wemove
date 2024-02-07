import { NewExercise } from "@/lib/ExerciseType";
import { addNewExercise } from "@/servises/apiExercise";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAddExercise = () => {
  const { mutate: addExercise } = useMutation({
    mutationFn: ({
      newExercise,
      query,
    }: {
      newExercise: NewExercise;
      query: string;
    }) => addNewExercise(newExercise, query),
    onSuccess: () => {
      toast.success("New Exercise created");
    },
    onError: (err) => toast.error(err.message),
  });

  return { addExercise };
};

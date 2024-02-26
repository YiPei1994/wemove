import { deleteExerciseData } from "@/servises/apiExercise";
import { useMutation } from "@tanstack/react-query";

export const useDeleteExerciseData = () => {
  const { mutate: deletingExerciseData } = useMutation({
    mutationFn: ({
      query,
      id,
      userId,
    }: {
      query: string;
      id: number;
      userId: string;
    }) => deleteExerciseData(query, id, userId),
  });
  return { deletingExerciseData };
};

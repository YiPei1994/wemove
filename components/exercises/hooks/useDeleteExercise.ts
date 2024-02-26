import { deleteExercise } from "@/servises/apiExercise";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteExercise = () => {
  const { mutate: deleting } = useMutation({
    mutationFn: ({ query, id }: { query: string; id: number }) =>
      deleteExercise(query, id),
    onSuccess: () => {
      toast.success("Delete successful.");
    },
    onError: (err) => toast.error(err.message),
  });
  return { deleting };
};

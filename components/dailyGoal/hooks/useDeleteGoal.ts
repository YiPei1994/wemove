import { deleteGoal } from "@/servises/apiDailyGoals";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteGoal = () => {
  const { mutate: deletingGoal } = useMutation({
    mutationFn: ({
      type,
      userId,
      id,
    }: {
      type: "unfinished" | "finished" | "daily";
      userId: string;
      id: number;
    }) => deleteGoal(type, userId, id),
    onSuccess: () => {
      toast.success("Goal deleted!");
    },
    onError: (err) => toast.error(err.message),
  });
  return { deletingGoal };
};

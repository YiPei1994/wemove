import { deleteGoal } from "@/servises/apiDailyGoals";
import { useMutation } from "@tanstack/react-query";

export const useDeleteGoal = () => {
  const { mutate: deletingGoal } = useMutation({
    mutationFn: ({
      goal_id,
      daily,
      userId,
    }: {
      goal_id: number | undefined;
      daily: boolean;
      userId: string;
    }) => deleteGoal(goal_id, daily, userId),
  });

  return { deletingGoal };
};

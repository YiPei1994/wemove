import { completeTemp } from "@/servises/apiDailyGoals";
import { useMutation } from "@tanstack/react-query";

export const useCompleteTemp = () => {
  const { mutate: completingTempGoal } = useMutation({
    mutationFn: ({
      goal_id,
      status,
      userId,
    }: {
      goal_id: number;
      status: boolean;
      userId: string;
    }) => completeTemp(goal_id, status, userId),
  });

  return { completingTempGoal };
};

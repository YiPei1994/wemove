import { completePerm } from "@/servises/apiDailyGoals";
import { useMutation } from "@tanstack/react-query";

export const useCompletePerm = () => {
  const { mutate: completingPermGoal } = useMutation({
    mutationFn: ({
      goal_id,
      status,
      userId,
      dateNow,
    }: {
      goal_id: number;
      status: boolean;
      userId: string;
      dateNow?: string | undefined;
    }) => completePerm(goal_id, status, userId, dateNow),
  });

  return { completingPermGoal };
};

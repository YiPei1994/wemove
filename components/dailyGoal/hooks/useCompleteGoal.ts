import { UserGoalType } from "@/lib/DailyGoalsType";
import { addCompleteGoal } from "@/servises/apiDailyGoals";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCompleteGoal = () => {
  const { mutate: completingGoal } = useMutation({
    mutationFn: ({
      newGoal,
      type,
      id,
    }: {
      newGoal: UserGoalType;
      type: "unfinished" | "daily";
      id: number;
    }) => addCompleteGoal(newGoal, type, id),
    onSuccess: () => {
      toast.success("Good job!");
    },
    onError: (err) => toast.error(err.message),
  });

  return { completingGoal };
};

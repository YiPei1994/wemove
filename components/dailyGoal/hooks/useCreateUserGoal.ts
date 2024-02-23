import { createUserGoal } from "@/servises/apiDailyGoals";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateUserGoal = () => {
  const { mutate: creatingGoal } = useMutation({
    mutationFn: createUserGoal,
    onSuccess: () => {
      toast.success("Goal added.");
    },
    onError: (err) => toast.error(err.message),
  });
  return { creatingGoal };
};

import { createUserDay } from "@/servises/apiDailyGoals";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateUserDay = () => {
  const { mutate: creatingDay } = useMutation({
    mutationFn: createUserDay,
    onError: (err) => toast.error(err.message),
  });
  return { creatingDay };
};

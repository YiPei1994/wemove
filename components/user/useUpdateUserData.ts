import { updateUserStat } from "@/servises/apiUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateUserData = () => {
  const queryClient = useQueryClient();
  const { mutate: updateData } = useMutation({
    mutationFn: updateUserStat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      toast.success("Succesfully updated your stats.");
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateData };
};

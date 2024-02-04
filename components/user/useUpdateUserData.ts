import { UserDataSchema } from "@/lib/userType";
import { upsertUserStat } from "@/servises/apiUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateUserData = () => {
  const queryClient = useQueryClient();
  const { mutate: upsertData } = useMutation({
    mutationFn: ({ newData, id }: { newData: UserDataSchema; id: string }) =>
      upsertUserStat(newData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      toast.success("Successfully updated your stats.");
    },
    onError: (err) => toast.error(err.message),
  });
  return { upsertData };
};

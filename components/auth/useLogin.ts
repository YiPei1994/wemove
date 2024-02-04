import { userLogin } from "@/servises/apiUserAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { mutate: login } = useMutation({
    mutationFn: userLogin,
    onSuccess: (data) => {
      const user = data?.user; // Make sure to access the correct property based on your API response
      toast.success("Successful!");
      queryClient.setQueryData(["user", user], user); // Pass the updater function
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { login };
};

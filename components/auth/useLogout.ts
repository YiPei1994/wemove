import { signOut } from "@/servises/apiUserAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useLogOut() {
  const queryClient = useQueryClient();
  const { mutate: logOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success("User was successfully logged out.");
    },
  });
  return { logOut };
}

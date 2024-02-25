import { signOut } from "@/servises/apiUserAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogOut() {
  const queryClient = useQueryClient();
  const { mutate: logOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.removeQueries();
    },
  });
  return { logOut };
}

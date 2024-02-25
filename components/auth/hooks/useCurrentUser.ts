import { getCurrentUser } from "@/servises/apiUserAuth";
import { useQuery } from "@tanstack/react-query";

export function useCurrentUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return { isLoading, user, isAutenticated: user?.role === "authenticated" };
}

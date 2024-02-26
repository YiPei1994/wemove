import { getUserData } from "@/servises/apiUser";
import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "../../auth/hooks/useCurrentUser";

export const useReadUser = () => {
  const { user } = useCurrentUser();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["userData", user?.id],
    queryFn: () => (user ? getUserData(user.id) : null),
    enabled: !!user,
  });

  return { userData, isLoading };
};

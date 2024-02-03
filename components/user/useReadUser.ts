import { getUserData } from "@/servises/apiUser";
import { useQuery } from "@tanstack/react-query";

export const useReadUser = () => {
  const { data: userData, isLoading } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
  });

  return { userData, isLoading };
};

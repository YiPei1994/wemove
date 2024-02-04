import { userSignup } from "@/servises/apiUserAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useSignup = () => {
  const { mutate: signUp } = useMutation({
    mutationFn: userSignup,
    onSuccess: () => {
      toast.success("New Account succesfully created .");
    },
    onError: (err) => toast.error(err.message),
  });
  return { signUp };
};

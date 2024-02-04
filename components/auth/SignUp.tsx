"use client";

import { useForm } from "react-hook-form";
import { UserAuthSchema, userAuthSchema } from "@/lib/AuthType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useSignup } from "./useSignup";
import { useState } from "react";
function SignUp() {
  const [displayConfirm, setDisplayConfirm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserAuthSchema>({ resolver: zodResolver(userAuthSchema) });
  const route = useRouter();
  const { signUp } = useSignup();
  function onSubmit(data: UserAuthSchema) {
    if (!data) return;
    const newData = {
      email: data.email,
      password: data.password,
    };
    signUp(newData, {
      onSuccess: () => {
        setDisplayConfirm(true);
      },
    });
  }
  return (
    <div className="flex justify-center flex-col gap-4 px-10 items-center mt-10 w-full">
      <div>Logo</div>
      {!displayConfirm && (
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2">
            <input
              className="p-2 w-full"
              type="email"
              id="email"
              placeholder="Your email..."
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500">{`${errors.email.message}`} </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input
              className="p-2 w-full"
              type="password"
              id="password"
              placeholder="Your password..."
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500">{`${errors.password.message}`} </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input
              className="p-2 w-full"
              type="password"
              id="confirmPassword"
              placeholder="Repeat your password..."
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500">
                {`${errors.confirmPassword.message}`}{" "}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="reset"
              className="px-4 py-2 w-auto bg-red-500 rounded-lg text-white"
              onClick={() => route.push("/login")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 w-auto bg-blue-500/50 rounded-lg text-white"
            >
              Sign up
            </button>
          </div>
        </form>
      )}
      {displayConfirm && (
        <div className="flex justify-center items-center bg-slate-50 p-4 rounded-lg">
          <p>Please check your email for authorization.</p>
        </div>
      )}
    </div>
  );
}

export default SignUp;

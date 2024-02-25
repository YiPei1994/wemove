"use client";

import { useForm } from "react-hook-form";
import { UserAuthSchema, userRegisterSchema } from "@/lib/AuthType";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "../header/Logo";
import { useSignup } from "./hooks/useSignup";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { useState } from "react";

function SignUp() {
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserAuthSchema>({ resolver: zodResolver(userRegisterSchema) });
  const { signUp } = useSignup();
  function onSubmit(data: UserAuthSchema) {
    if (!data) return;
    const newData = {
      email: data.email,
      password: data.password,
    };
    signUp(newData, {
      onSuccess: () => {
        toast({
          description: "Check your email for verification.",
        });
        setRegisterSuccess(true);
      },
    });
  }
  return (
    <Dialog>
      <div className="flex gap-4 items-center">
        <p>No account yet? Join us!</p>
        <DialogTrigger asChild>
          <Button>Sign Up</Button>
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader className="flex items-center justify-center p">
          <DialogTitle>
            {" "}
            <Logo />
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {registerSuccess && (
          <p className="text-center text-xl">
            &quot;Welcome! Let&apos;s improve ourselves and become better
            versions of ourselves. But first, head over to your email to verify
            the account.&quot;
          </p>
        )}

        {!registerSuccess && (
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
              {errors.email && <p>{`${errors.email.message}`} </p>}
            </div>
            <div className="flex flex-col gap-2">
              <input
                className="p-2 w-full"
                type="password"
                id="password"
                placeholder="Your password..."
                {...register("password")}
              />
              {errors.password && <p>{`${errors.password.message}`} </p>}
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
                <p>{`${errors.confirmPassword.message}`} </p>
              )}
            </div>
            <div className="flex items-center justify-between gap-2">
              <Button type="reset" disabled={isSubmitting}>
                Reset
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                Sign up
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default SignUp;

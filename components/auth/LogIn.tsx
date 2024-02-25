"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { userLoginSchema } from "@/lib/AuthType";
import { useRouter } from "next/navigation";
import { useLogin } from "./hooks/useLogin";
import SignUp from "./SignUp";

export default function Login() {
  const { login } = useLogin();
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "test@gmail.yp",
      password: "testacc",
    },
  });

  function onSubmit(data: z.infer<typeof userLoginSchema>) {
    if (!data) return;
    login(data, {
      onSuccess: () => {
        router.push("/");
        toast({
          description: "Log-in success!",
        });
      },
      onError: (err: any) => {
        toast({
          title: "Log-in failed!",
          description: err.message,
        });
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" type="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-4">
          <Button type="submit">Log In</Button>
        </div>
      </form>
    </Form>
  );
}

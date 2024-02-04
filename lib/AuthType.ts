import { z } from "zod";

export type UserLogin = {
  email: string;
  password: string;
};

export const userAuthSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "This is required, and minimum of 6 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Both passwords need to be the same.",
    path: ["confirmPassword"],
  });

export type UserAuthSchema = z.infer<typeof userAuthSchema>;

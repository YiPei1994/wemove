import { z } from "zod";

export const userLoginSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password need to be at least 6 characters",
  }),
});

export const userRegisterSchema = z
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

export type UserAuthSchema = z.infer<typeof userRegisterSchema>;

export type UserLogin = z.infer<typeof userLoginSchema>;

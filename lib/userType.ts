import { z } from "zod";

const genderSchema = z.enum(["male", "female"]);
export const userDataSchema = z.object({
  gender: genderSchema,
  age: z.coerce.number().min(1, { message: "This is required" }),
  height: z.coerce.number().min(1, { message: "This is required" }),
  weight: z.coerce.number().min(1, { message: "This is required" }),
  pal: z.coerce.number().min(1, { message: "This is required" }),
  bmr: z.coerce.number().min(1, { message: "This is required" }),
  calories: z.coerce.number().min(1, { message: "This is required" }),
});
export type UserDataSchema = z.infer<typeof userDataSchema>;

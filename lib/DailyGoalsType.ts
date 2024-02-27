import { z } from "zod";

export type UserDayType = {
  id?: number;
  date: string;
  goalStatus: string;
  userId: string;
};

export type UserGoalType = {
  id?: number;
  date: string;
  goal: string;
  description: string;
  userId: string;
  status: boolean;
  daily: boolean;
};

export const goalSchema = z.object({
  id: z.optional(z.number()),
  goal: z.string(),
  description: z.string(),
  daily: z.boolean(),
  userId: z.string(),
});

export type GoalType = z.infer<typeof goalSchema>;

import { z } from "zod";

export const goalSchema = z.object({
  goal_id: z.optional(z.number()),
  goal: z.string(),
  description: z.string(),
  daily: z.boolean(),
  date: z.optional(z.string()),
  userId: z.string(),
  status: z.boolean(),
});

export type GoalType = z.infer<typeof goalSchema>;

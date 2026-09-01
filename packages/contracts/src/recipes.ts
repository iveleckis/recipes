import { z } from "zod";

export const RecipeSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  title: z.string(),
  description: z.string(),
  created_at: z.string(),
  prep_time_seconds: z.number(),
});

export type Recipe = z.infer<typeof RecipeSchema>;

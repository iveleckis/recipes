import { z } from "zod";

export const RecipeSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  title: z.string(),
  ingredients: z.array(z.string()),
  steps: z.array(z.string()),
  created_at: z.string(),
  prep_time_minutes: z.number(),
});

export type Recipe = z.infer<typeof RecipeSchema>;

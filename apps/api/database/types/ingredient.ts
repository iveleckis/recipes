import { z } from "zod";

export const ingredientSchema = z.object({
  id: z.number(),
  title: z.string(),
});

export type Ingredient = z.infer<typeof ingredientSchema>;

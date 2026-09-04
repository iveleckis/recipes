import { z } from "zod";

export const createRecipeSchema = z.object({
  title: z
    .string()
    .min(1, "Recipe name is required")
    .max(50, "Recipe name must be 50 characters or less"),
});

export type CreateRecipeFormInputs = z.infer<typeof createRecipeSchema>;

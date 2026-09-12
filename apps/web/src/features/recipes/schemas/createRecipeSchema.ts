import { z } from "zod";

export const createRecipeSchema = z.object({
  title: z
    .string()
    .min(1, "Recipe name is required")
    .max(50, "Recipe name must be 50 characters or less"),
  prepTimeMinutes: z.coerce
    .number()
    .min(1, "Prep time is required")
    .max(9999, "Prep time must be less than 9999 minutes"),
  serves: z.coerce
    .number()
    .min(1, "Must serve at least one person")
    .max(999, "Should be less than 999"),
  ingredients: z.string().min(1).max(60),
  method: z.string().min(1).max(60),
  note: z.string().optional(),
});

export type CreateRecipeFormInput = z.input<typeof createRecipeSchema>;
export type CreateRecipeFormOutput = z.output<typeof createRecipeSchema>;

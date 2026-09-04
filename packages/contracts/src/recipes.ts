import { z } from "zod";

export const getRecipesResponseSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
  }),
);

export type GetRecipesResponse = z.infer<typeof getRecipesResponseSchema>;

export const createRecipeRequestSchema = z.object({
  title: z.string(),
});
export type CreateRecipeRequest = z.infer<typeof createRecipeRequestSchema>;

export const createRecipeResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
});
export type CreateRecipeResponse = z.infer<typeof createRecipeResponseSchema>;

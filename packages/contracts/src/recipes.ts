import { z } from "zod";

// GET ALL
export const getRecipesResponseSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
  }),
);

export type GetRecipesResponse = z.infer<typeof getRecipesResponseSchema>;

// GET ONE
export const getRecipeParamsSchema = z.object({
  id: z.coerce.number().int().nonnegative(),
});

export type GetRecipeParams = z.infer<typeof getRecipeParamsSchema>;

export const getRecipeResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
});

export type GetRecipeResponse = z.infer<typeof getRecipeResponseSchema>;

// CREATE
export const createRecipeRequestSchema = z.object({
  title: z.string(),
});
export type CreateRecipeRequest = z.infer<typeof createRecipeRequestSchema>;

export const createRecipeResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
});
export type CreateRecipeResponse = z.infer<typeof createRecipeResponseSchema>;

// DELETE
export const deleteRecipeParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type DeleteRecipeParams = z.infer<typeof deleteRecipeParamsSchema>;

export const deleteRecipeResponseSchema = z.object({
  id: z.number(),
});

export type DeleteRecipeResponse = z.infer<typeof deleteRecipeResponseSchema>;

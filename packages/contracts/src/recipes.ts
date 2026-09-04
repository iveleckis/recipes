import { z } from "zod";

export const getRecipesResponseSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
  }),
);

export type GetRecipesResponse = z.infer<typeof getRecipesResponseSchema>;

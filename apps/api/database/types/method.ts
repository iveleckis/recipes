import { z } from "zod";

export const methodSchema = z.object({
  id: z.number(),
  title: z.string(),
  recipe_id: z.number(),
  position: z.number(),
  instruction: z.string(),
});

export type Method = z.infer<typeof methodSchema>;

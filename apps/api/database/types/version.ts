import { z } from "zod";

export const VersionSchema = z.object({
  version: z.number(),
});

export type Version = z.infer<typeof VersionSchema>;

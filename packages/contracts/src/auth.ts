import { z } from "zod";

export const loginRequestSchema = z.object({
  username: z
    .string()
    .min(4, "Username must be at least 4 characters long")
    .max(50, "Username must be shorter"),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters long")
    .max(50, "Password must be shorter"),
});

export const loginResponseSchema = z.object({
  token: z.string().max(100, "Wrong token format"),
});

export type LoginRequest = z.infer<typeof loginRequestSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;

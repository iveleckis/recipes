import { z } from "zod";
export const UserSchema = z.object({
    id: z.number(),
    username: z.string(),
    password: z.string(),
    created_at: z.string(),
});
//# sourceMappingURL=user.js.map
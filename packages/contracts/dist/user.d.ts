import { z } from "zod";
export declare const UserSchema: z.ZodObject<{
    id: z.ZodNumber;
    username: z.ZodString;
    password: z.ZodString;
    created_at: z.ZodString;
}, z.core.$strip>;
export type User = z.infer<typeof UserSchema>;
//# sourceMappingURL=user.d.ts.map
import { z } from "zod";
export declare const LoginDtoSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type LoginDto = z.infer<typeof LoginDtoSchema>;
//# sourceMappingURL=auth.d.ts.map
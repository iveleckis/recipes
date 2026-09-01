import { z } from "zod";
export declare const RecipeSchema: z.ZodObject<{
    id: z.ZodNumber;
    user_id: z.ZodNumber;
    title: z.ZodString;
    description: z.ZodString;
    created_at: z.ZodString;
    prep_time_seconds: z.ZodNumber;
}, z.core.$strip>;
export type Recipe = z.infer<typeof RecipeSchema>;
//# sourceMappingURL=recipes.d.ts.map
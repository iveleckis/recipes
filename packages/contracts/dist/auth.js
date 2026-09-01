import { z } from "zod";
export const LoginDtoSchema = z.object({
    username: z.string(),
    password: z.string(),
});
//# sourceMappingURL=auth.js.map
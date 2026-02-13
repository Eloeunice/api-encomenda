import { z } from "zod/mini";

export const env = z
    .object({
        DATABASE_URL: z.url(),
        JWT_SECRET: z.string(),
    })
    .parse(process.env);
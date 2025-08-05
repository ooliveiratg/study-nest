import { z } from 'zod';

export const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string(),
    //coerce converte string para number
    PORT: z.coerce.number().default(3333),
})

export type EnvSchema = z.infer<typeof envSchema>;
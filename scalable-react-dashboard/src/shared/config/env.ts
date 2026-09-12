import { z } from "zod";

const envSchema = z.object({
  VITE_API_URL: z.string().startsWith("/").default("/api"),
});

export const env = envSchema.parse({
  VITE_API_URL: String(import.meta.env.VITE_API_URL ?? "/api"),
});

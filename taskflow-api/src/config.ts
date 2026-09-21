export type AppConfig = {
  port: number;
  host: string;
  databaseUrl: string;
  jwtSecret: string;
  logLevel: string;
};

export function loadConfig(
  env: NodeJS.ProcessEnv = process.env,
): AppConfig {
  const port = Number(env.PORT ?? "3000");
  const databaseUrl = env.DATABASE_URL ?? "";
  const jwtSecret = env.JWT_SECRET ?? "";

  if (!Number.isInteger(port) || port < 1) {
    throw new Error("PORT must be a positive integer");
  }
  if (!databaseUrl.startsWith("postgresql://")) {
    throw new Error("DATABASE_URL must use postgresql://");
  }
  if (jwtSecret.length < 32) {
    throw new Error("JWT_SECRET needs 32 characters");
  }

  return {
    port,
    host: env.HOST ?? "127.0.0.1",
    databaseUrl,
    jwtSecret,
    logLevel: env.LOG_LEVEL ?? "info",
  };
}

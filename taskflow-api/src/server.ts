import { PrismaClient } from "@prisma/client";
import { buildApp } from "./app.js";
import { loadConfig } from "./config.js";
import { PrismaTaskRepository } from "./modules/tasks/prisma-task.repository.js";

const config = loadConfig();
const prisma = new PrismaClient();
const app = await buildApp({
  repo: new PrismaTaskRepository(prisma),
  jwtSecret: config.jwtSecret,
  logger: true,
});

const shutdown = async (signal: string) => {
  app.log.info({ signal }, "shutting down");
  await app.close();
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));

await app.listen({
  port: config.port,
  host: config.host,
});

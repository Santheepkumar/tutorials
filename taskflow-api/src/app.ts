import jwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import Fastify from "fastify";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { MemoryTaskRepository } from "./modules/tasks/memory-task.repository.js";
import type { TaskRepository } from "./modules/tasks/task.repository.js";
import { taskRoutes } from "./modules/tasks/task.routes.js";
import { TaskService } from "./modules/tasks/task.service.js";
import { registerErrorHandler } from "./shared/error-handler.js";

type BuildAppOptions = {
  repo?: TaskRepository;
  jwtSecret?: string;
  logger?: boolean;
};

export async function buildApp(
  options: BuildAppOptions = {},
) {
  const app = Fastify({
    logger: options.logger ?? true,
    requestIdHeader: "x-request-id",
  });

  await app.register(swagger, {
    openapi: {
      info: { title: "TaskFlow API", version: "1.0.0" },
      components: {
        securitySchemes: {
          bearerAuth: { type: "http", scheme: "bearer" },
        },
      },
    },
  });
  await app.register(swaggerUi, { routePrefix: "/docs" });
  await app.register(jwt, {
    secret: options.jwtSecret ?? "test-secret-that-is-at-least-32-chars",
  });

  registerErrorHandler(app);
  app.get("/health/live", async () => ({ status: "ok" }));
  app.get("/health/ready", async () => ({ status: "ready" }));
  await app.register(authRoutes, { prefix: "/auth" });
  await app.register(taskRoutes, {
    prefix: "/tasks",
    service: new TaskService(
      options.repo ?? new MemoryTaskRepository(),
    ),
  });

  return app;
}

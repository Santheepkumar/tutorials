import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";
import {
  CreateTaskSchema,
  TaskSchema,
  UpdateTaskSchema,
} from "./task.schema.js";
import { TaskService } from "./task.service.js";

type Options = { service: TaskService };

export const taskRoutes: FastifyPluginAsyncTypebox<Options> =
async (app, options) => {
  app.addHook("onRequest", async (request) => {
    await request.jwtVerify();
  });

  app.get("/", {
    schema: { response: { 200: Type.Array(TaskSchema) } },
  }, async (request) => {
    return options.service.list(request.user.sub);
  });

  app.post("/", {
    schema: {
      body: CreateTaskSchema,
      response: { 201: TaskSchema },
    },
  }, async (request, reply) => {
    const task = await options.service.create(
      request.user.sub,
      request.body,
    );
    return reply.status(201).send(task);
  });

  app.patch("/:id", {
    schema: {
      params: Type.Object({ id: Type.String() }),
      body: UpdateTaskSchema,
      response: { 200: TaskSchema },
    },
  }, async (request) => {
    return options.service.update(
      request.user.sub,
      request.params.id,
      request.body,
    );
  });

  app.delete("/:id", {
    schema: {
      params: Type.Object({ id: Type.String() }),
      response: { 204: Type.Null() },
    },
  }, async (request, reply) => {
    await options.service.delete(
      request.user.sub,
      request.params.id,
    );
    return reply.status(204).send(null);
  });
};

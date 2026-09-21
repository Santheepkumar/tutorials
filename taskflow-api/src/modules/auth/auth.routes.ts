import { scryptSync, timingSafeEqual } from "node:crypto";
import type { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@sinclair/typebox";

const LoginSchema = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 8 }),
});

const demoHash = scryptSync(
  "learn-node",
  "taskflow-demo-salt",
  64,
);

export const authRoutes: FastifyPluginAsyncTypebox =
async (app) => {
  app.post("/login", {
    schema: {
      body: LoginSchema,
      response: {
        200: Type.Object({ token: Type.String() }),
        401: Type.Object({ error: Type.String() }),
      },
    },
  }, async (request, reply) => {
    const candidate = scryptSync(
      request.body.password,
      "taskflow-demo-salt",
      64,
    );
    const valid = request.body.email === "demo@taskflow.dev"
      && timingSafeEqual(candidate, demoHash);

    if (!valid) {
      return reply.status(401).send({
        error: "INVALID_CREDENTIALS",
      });
    }

    return {
      token: await reply.jwtSign({
        sub: "demo-user",
        email: request.body.email,
      }),
    };
  });
};

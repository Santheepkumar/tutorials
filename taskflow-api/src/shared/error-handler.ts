import type { FastifyInstance } from "fastify";
import { AppError } from "./errors.js";

type HttpError = Error & {
  statusCode?: number;
  code?: string;
  validation?: unknown;
};

export function registerErrorHandler(
  app: FastifyInstance,
): void {
  app.setErrorHandler((error: unknown, request, reply) => {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        error: error.code,
        message: error.message,
        requestId: request.id,
      });
    }

    const httpError = error as HttpError;
    if (httpError.validation) {
      return reply.status(400).send({
        error: "VALIDATION_ERROR",
        message: "Request data is not valid",
        requestId: request.id,
      });
    }

    if (
      httpError.statusCode &&
      httpError.statusCode >= 400 &&
      httpError.statusCode < 500
    ) {
      return reply.status(httpError.statusCode).send({
        error: httpError.code ?? "REQUEST_ERROR",
        message: httpError.message,
        requestId: request.id,
      });
    }

    request.log.error({ err: error }, "request failed");
    return reply.status(500).send({
      error: "INTERNAL_ERROR",
      message: "Something went wrong",
      requestId: request.id,
    });
  });
}

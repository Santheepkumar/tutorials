import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { buildApp } from "../src/app.js";

const app = await buildApp({ logger: false });
let token = "";

before(async () => {
  await app.ready();
  const login = await app.inject({
    method: "POST",
    url: "/auth/login",
    payload: {
      email: "demo@taskflow.dev",
      password: "learn-node",
    },
  });
  token = login.json().token;
});

after(async () => app.close());

test("health endpoint is ready", async () => {
  const response = await app.inject({
    method: "GET",
    url: "/health/ready",
  });
  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.json(), { status: "ready" });
});

test("authenticated user creates a task", async () => {
  const response = await app.inject({
    method: "POST",
    url: "/tasks",
    headers: { authorization: `Bearer ${token}` },
    payload: { title: "Learn Fastify" },
  });
  assert.equal(response.statusCode, 201);
  assert.equal(response.json().title, "Learn Fastify");
});

test("invalid task returns a stable error", async () => {
  const response = await app.inject({
    method: "POST",
    url: "/tasks",
    headers: { authorization: `Bearer ${token}` },
    payload: { title: "" },
  });
  assert.equal(response.statusCode, 400);
  assert.equal(response.json().error, "VALIDATION_ERROR");
});

test("tasks require authentication", async () => {
  const response = await app.inject({
    method: "GET",
    url: "/tasks",
  });
  assert.equal(response.statusCode, 401);
});

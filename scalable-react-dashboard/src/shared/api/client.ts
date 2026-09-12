import { env } from "@/shared/config/env";

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function getJson(path: string, signal?: AbortSignal): Promise<unknown> {
  const url = new URL(`${env.VITE_API_URL}${path}`, window.location.origin);
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: signal ?? null,
  });

  if (!response.ok) {
    throw new ApiError("The project service is unavailable.", response.status);
  }

  return response.json() as Promise<unknown>;
}

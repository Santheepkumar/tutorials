import { queryOptions, useQuery } from "@tanstack/react-query";
import { ZodError } from "zod";
import { ApiError } from "@/shared/api/client";
import { getProject, getProjects, type ProjectFilters } from "./projectApi";

export const projectKeys = {
  all: ["projects"] as const,
  list: (filters: ProjectFilters) => [...projectKeys.all, "list", filters] as const,
  detail: (id: string) => [...projectKeys.all, "detail", id] as const,
};

const shouldRetry = (attempt: number, error: Error) => {
  if (error instanceof ZodError) return false;
  return attempt < 2 && (!(error instanceof ApiError) || error.status >= 500);
};

export const projectsQuery = (filters: ProjectFilters) =>
  queryOptions({
    queryKey: projectKeys.list(filters),
    queryFn: ({ signal }) => getProjects(filters, signal),
    staleTime: 60_000,
    retry: shouldRetry,
    retryDelay: (attempt) => 100 * (attempt + 1),
  });

export const projectQuery = (id: string) =>
  queryOptions({
    queryKey: projectKeys.detail(id),
    queryFn: ({ signal }) => getProject(id, signal),
    staleTime: 60_000,
    retry: shouldRetry,
    retryDelay: (attempt) => 100 * (attempt + 1),
  });

export const useProjects = (filters: ProjectFilters) => useQuery(projectsQuery(filters));

export const useProject = (id: string) => useQuery(projectQuery(id));

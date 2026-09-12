import { getJson } from "@/shared/api/client";
import {
  projectSchema,
  projectsPageSchema,
  type Project,
  type ProjectsPage,
} from "../model/project";

export type ProjectFilters = {
  query: string;
  page: number;
};

export async function getProjects(
  filters: ProjectFilters,
  signal?: AbortSignal,
): Promise<ProjectsPage> {
  const search = new URLSearchParams({
    q: filters.query,
    page: String(filters.page),
  });
  const payload = await getJson(`/projects?${search}`, signal);
  return projectsPageSchema.parse(payload);
}

export async function getProject(
  projectId: string,
  signal?: AbortSignal,
): Promise<Project> {
  const payload = await getJson(`/projects/${projectId}`, signal);
  return projectSchema.parse(payload);
}

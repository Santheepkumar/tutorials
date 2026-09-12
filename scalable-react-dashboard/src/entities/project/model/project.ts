import { z } from "zod";

export const projectStatusSchema = z.enum([
  "on-track",
  "at-risk",
  "planning",
  "complete",
]);

export const projectSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  summary: z.string().min(1),
  owner: z.string().min(1),
  team: z.string().min(1),
  status: projectStatusSchema,
  progress: z.number().int().min(0).max(100),
  updatedAt: z.iso.datetime(),
});

export const projectsPageSchema = z.object({
  items: z.array(projectSchema),
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
  total: z.number().int().nonnegative(),
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectsPage = z.infer<typeof projectsPageSchema>;
export type ProjectStatus = z.infer<typeof projectStatusSchema>;

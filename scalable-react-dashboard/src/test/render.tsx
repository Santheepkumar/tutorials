import { QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { createQueryClient } from "@/app/providers";
import { ProjectsPage } from "@/routes/projects/ProjectsPage";

export function renderProjectsRoute(initialEntry = "/projects") {
  const queryClient = createQueryClient();
  const router = createMemoryRouter([{ path: "/projects", Component: ProjectsPage }], {
    initialEntries: [initialEntry],
  });

  return {
    queryClient,
    router,
    ...render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>,
    ),
  };
}

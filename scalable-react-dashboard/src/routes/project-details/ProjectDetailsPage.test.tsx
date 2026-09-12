import { QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { createQueryClient } from "@/app/providers";
import { ProjectDetailsPage } from "./ProjectDetailsPage";

function renderDetails(projectId = "atlas-design-system") {
  const router = createMemoryRouter(
    [
      {
        path: "/projects/:projectId",
        Component: ProjectDetailsPage,
      },
    ],
    { initialEntries: [`/projects/${projectId}`] },
  );

  return render(
    <QueryClientProvider client={createQueryClient()}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

describe("ProjectDetailsPage", () => {
  it("renders loading and project details", async () => {
    renderDetails();

    expect(screen.getByText("Loading")).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: "Atlas Design System" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Maya Chen")).toBeInTheDocument();
  });

  it("renders a missing project error", async () => {
    renderDetails("does-not-exist");

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "The project service is unavailable.",
    );
  });
});

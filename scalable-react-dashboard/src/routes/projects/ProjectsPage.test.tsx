import { http, HttpResponse } from "msw";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { server } from "@/test/server";
import { renderProjectsRoute } from "@/test/render";

describe("ProjectsPage", () => {
  it("renders loading and populated states", async () => {
    renderProjectsRoute();

    expect(screen.getByText("Loading projects")).toBeInTheDocument();
    expect(await screen.findByText("Atlas Design System")).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(6);
  });

  it("stores filters in the URL", async () => {
    const user = userEvent.setup();
    const { router } = renderProjectsRoute();

    const search = screen.getByRole("searchbox");
    await user.type(search, "commerce");
    await user.click(screen.getByRole("button", { name: "Apply filter" }));

    expect(router.state.location.search).toBe("?q=commerce");
    expect(await screen.findByText("Checkout Reliability")).toBeInTheDocument();
    expect(screen.queryByText("Atlas Design System")).not.toBeInTheDocument();
  });

  it("restores filter and pagination from the URL", async () => {
    renderProjectsRoute("/projects?q=platform&page=1");

    expect(screen.getByRole("searchbox")).toHaveValue("platform");
    expect(await screen.findByText("Atlas Design System")).toBeInTheDocument();
  });

  it("moves pagination into the URL", async () => {
    const user = userEvent.setup();
    const { router } = renderProjectsRoute();

    expect(await screen.findByText("Atlas Design System")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Next" }));

    expect(router.state.location.search).toBe("?page=2");
    expect(await screen.findByText("Notification Center")).toBeInTheDocument();
  });

  it("renders an empty state", async () => {
    renderProjectsRoute("/projects?q=missing");
    expect(await screen.findByText("No projects found")).toBeInTheDocument();
  });

  it("renders service failures", async () => {
    server.use(
      http.get("*/api/projects", () =>
        HttpResponse.json({ message: "Down" }, { status: 503 }),
      ),
    );
    renderProjectsRoute();

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "The project service is unavailable.",
    );
  });

  it("rejects invalid API payloads", async () => {
    server.use(http.get("*/api/projects", () => HttpResponse.json({ items: "invalid" })));
    renderProjectsRoute();

    expect(await screen.findByRole("alert")).toHaveTextContent("Projects unavailable");
  });
});

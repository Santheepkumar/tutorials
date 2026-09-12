import { delay, http, HttpResponse } from "msw";
import { projects } from "./data";

const pageSize = 6;

export const handlers = [
  http.get("*/api/projects", async ({ request }) => {
    await delay(80);
    const url = new URL(request.url);
    const query = (url.searchParams.get("q") ?? "").toLowerCase();
    const requestedPage = Number(url.searchParams.get("page") ?? "1");
    const page = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
    const filtered = projects.filter((project) =>
      [project.name, project.team, project.owner].join(" ").toLowerCase().includes(query),
    );
    const start = (page - 1) * pageSize;

    return HttpResponse.json({
      items: filtered.slice(start, start + pageSize),
      page,
      pageSize,
      total: filtered.length,
    });
  }),
  http.get("*/api/projects/:projectId", async ({ params }) => {
    await delay(60);
    const project = projects.find((item) => item.id === params.projectId);
    return project
      ? HttpResponse.json(project)
      : HttpResponse.json({ message: "Not found" }, { status: 404 });
  }),
];

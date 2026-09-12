import {
  Navigate,
  createBrowserRouter,
  isRouteErrorResponse,
  useRouteError,
} from "react-router";
import { AppShell } from "./AppShell";

function RouteErrorPage() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? `${String(error.status)} ${error.statusText}`
    : "The page could not be loaded.";

  return (
    <main className="route-error">
      <p className="eyebrow">Something went wrong</p>
      <h1>{message}</h1>
      <a href="/projects">Return to the portfolio</a>
    </main>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppShell,
    ErrorBoundary: RouteErrorPage,
    children: [
      { index: true, element: <Navigate replace to="/projects" /> },
      {
        path: "projects",
        lazy: async () => {
          const module = await import("@/routes/projects/ProjectsPage");
          return { Component: module.ProjectsPage };
        },
      },
      {
        path: "projects/:projectId",
        lazy: async () => {
          const module = await import("@/routes/project-details/ProjectDetailsPage");
          return { Component: module.ProjectDetailsPage };
        },
      },
    ],
  },
]);

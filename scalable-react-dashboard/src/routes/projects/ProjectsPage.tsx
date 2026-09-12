import { ProjectCard, useProjects } from "@/entities/project";
import { ProjectSearch } from "@/features/project-search";
import { StatusPanel } from "@/shared/ui/StatusPanel";
import { useSearchParams } from "react-router";
import styles from "./ProjectsPage.module.css";

function readPage(value: string | null) {
  const page = Number(value ?? "1");
  return Number.isInteger(page) && page > 0 ? page : 1;
}

export function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const page = readPage(searchParams.get("page"));
  const projects = useProjects({ query, page });

  const updateSearch = (nextQuery: string) => {
    const next = new URLSearchParams();
    if (nextQuery) next.set("q", nextQuery);
    setSearchParams(next);
  };

  const updatePage = (nextPage: number) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(nextPage));
    setSearchParams(next);
  };

  const totalPages = projects.data
    ? Math.max(1, Math.ceil(projects.data.total / projects.data.pageSize))
    : 1;

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div>
          <p className="eyebrow">Portfolio health</p>
          <h1>
            Ship with clarity,
            <br />
            not ceremony.
          </h1>
          <p>
            A single view of delivery risk, ownership, and progress across your product
            teams.
          </p>
        </div>
        <dl className={styles.summary}>
          <div>
            <dt>Active</dt>
            <dd>12</dd>
          </div>
          <div>
            <dt>On track</dt>
            <dd>8</dd>
          </div>
          <div>
            <dt>At risk</dt>
            <dd>2</dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="projects-heading" className={styles.projects}>
        <div className={styles.toolbar}>
          <div>
            <p className="eyebrow">Live portfolio</p>
            <h2 id="projects-heading">Projects</h2>
          </div>
          <ProjectSearch key={query} initialQuery={query} onSearch={updateSearch} />
        </div>

        {projects.isPending ? (
          <StatusPanel
            message="Fetching the current portfolio."
            title="Loading projects"
          />
        ) : projects.isError ? (
          <StatusPanel
            message={projects.error.message}
            role="alert"
            title="Projects unavailable"
          />
        ) : projects.data.items.length === 0 ? (
          <StatusPanel
            message="Try a different name, team, or owner."
            title="No projects found"
          />
        ) : (
          <div className={styles.grid}>
            {projects.data.items.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {projects.data && projects.data.total > 0 ? (
          <nav aria-label="Project pages" className={styles.pagination}>
            <button
              disabled={page === 1}
              onClick={() => {
                updatePage(page - 1);
              }}
              type="button"
            >
              Previous
            </button>
            <span aria-live="polite">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => {
                updatePage(page + 1);
              }}
              type="button"
            >
              Next
            </button>
          </nav>
        ) : null}
      </section>
    </div>
  );
}

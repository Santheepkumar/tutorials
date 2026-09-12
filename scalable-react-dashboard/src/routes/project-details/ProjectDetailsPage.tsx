import { useProject } from "@/entities/project";
import { StatusPanel } from "@/shared/ui/StatusPanel";
import { Link, useParams } from "react-router";
import styles from "./ProjectDetailsPage.module.css";

export function ProjectDetailsPage() {
  const { projectId = "" } = useParams();
  const project = useProject(projectId);

  if (project.isPending) {
    return <StatusPanel message="Fetching project details." title="Loading" />;
  }

  if (project.isError) {
    return (
      <StatusPanel
        message={project.error.message}
        role="alert"
        title="Project unavailable"
      />
    );
  }

  return (
    <article className={styles.page}>
      <Link to="/projects">← Back to portfolio</Link>
      <p className="eyebrow">{project.data.team}</p>
      <h1>{project.data.name}</h1>
      <p className={styles.summary}>{project.data.summary}</p>
      <dl>
        <div>
          <dt>Owner</dt>
          <dd>{project.data.owner}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{project.data.status}</dd>
        </div>
        <div>
          <dt>Progress</dt>
          <dd>{String(project.data.progress)}%</dd>
        </div>
      </dl>
    </article>
  );
}

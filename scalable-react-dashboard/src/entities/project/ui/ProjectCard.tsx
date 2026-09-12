import { Link } from "react-router";
import type { Project } from "../model/project";
import styles from "./ProjectCard.module.css";

const statusLabels: Record<Project["status"], string> = {
  "on-track": "On track",
  "at-risk": "At risk",
  planning: "Planning",
  complete: "Complete",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.card}>
      <div className={styles.topline}>
        <span className={styles.team}>{project.team}</span>
        <span className={styles[project.status]}>{statusLabels[project.status]}</span>
      </div>
      <div>
        <h2>
          <Link to={`/projects/${project.id}`}>{project.name}</Link>
        </h2>
        <p>{project.summary}</p>
      </div>
      <div className={styles.progressRow}>
        <div>
          <span>{project.progress}% complete</span>
          <div
            aria-label={`${String(project.progress)}% complete`}
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={project.progress}
            className={styles.progress}
            role="progressbar"
          >
            <span style={{ width: `${String(project.progress)}%` }} />
          </div>
        </div>
        <span>Owner · {project.owner}</span>
      </div>
    </article>
  );
}

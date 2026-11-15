import Link from "next/link";
import { getProjects } from "@/lib/data";

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <>
      <h1 className="page-title">Projets</h1>

      {projects.length === 0 ? (
        <p className="empty">Aucun projet.</p>
      ) : (
        <ul className="project-grid">
          {projects.map((project) => {
            const done = project.tasks.filter((t) => t.status === "done").length;
            return (
              <li key={project.id}>
                <Link href={`/projects/${project.id}`} className="project-card">
                  <h2 className="project-name">{project.name}</h2>
                  <p className="project-description">{project.description}</p>
                  <p className="project-progress">
                    {done} / {project.tasks.length} tâche(s) terminée(s)
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

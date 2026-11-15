import Link from "next/link";
import { notFound } from "next/navigation";
import TaskBoard from "@/components/TaskBoard";
import { getProject } from "@/lib/data";

export default async function ProjectPage({ params }: PageProps<"/projects/[id]">) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Link href="/" className="back-link">
        ← Tous les projets
      </Link>
      <h1 className="page-title">{project.name}</h1>
      <p className="muted">{project.description}</p>
      <TaskBoard tasks={project.tasks} />
    </>
  );
}

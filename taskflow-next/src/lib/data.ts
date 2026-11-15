import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Project, ProjectWithTasks, Task } from "./types";

type Database = {
  projects: Project[];
  tasks: Task[];
};

async function readDatabase(): Promise<Database> {
  const file = await readFile(path.join(process.cwd(), "db.json"), "utf8");
  return JSON.parse(file) as Database;
}

export async function getProjects(): Promise<ProjectWithTasks[]> {
  const { projects, tasks } = await readDatabase();
  return projects.map((project) => ({
    ...project,
    tasks: tasks.filter((task) => task.projectId === project.id),
  }));
}

export async function getProject(id: string): Promise<ProjectWithTasks | undefined> {
  const { projects, tasks } = await readDatabase();
  const project = projects.find((p) => p.id === id);
  if (!project) return undefined;
  return { ...project, tasks: tasks.filter((task) => task.projectId === id) };
}

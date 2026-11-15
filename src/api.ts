import type { NewProject, NewTask, Project, ProjectWithTasks, Task } from './types'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  })

  if (!response.ok) {
    throw new ApiError(response.status, `Erreur ${response.status} sur ${path}`)
  }

  return (await response.json()) as T
}

export function getProjects() {
  return request<ProjectWithTasks[]>('/projects?_embed=tasks')
}

export function getProject(id: string) {
  return request<ProjectWithTasks>(`/projects/${encodeURIComponent(id)}?_embed=tasks`)
}

export function createProject(project: NewProject) {
  return request<Project>('/projects', {
    method: 'POST',
    body: JSON.stringify(project),
  })
}

export function createTask(task: NewTask) {
  return request<Task>('/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
  })
}

export function updateTask(id: string, changes: Partial<NewTask>) {
  return request<Task>(`/tasks/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: JSON.stringify(changes),
  })
}

export function deleteTask(id: string) {
  return request<Task>(`/tasks/${encodeURIComponent(id)}`, { method: 'DELETE' })
}

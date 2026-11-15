export type Status = 'todo' | 'doing' | 'done'

export type Priority = 1 | 2 | 3

export type Task = {
  id: string
  projectId: string
  title: string
  status: Status
  priority: Priority
}

export type NewTask = Omit<Task, 'id'>

export type Project = {
  id: string
  name: string
  description: string
}

export type NewProject = Omit<Project, 'id'>

export type ProjectWithTasks = Project & {
  tasks: Task[]
}

export type Filter = 'all' | Status

export const STATUS_LABELS: Record<Status, string> = {
  todo: 'À faire',
  doing: 'En cours',
  done: 'Terminé',
}

export function nextStatus(status: Status): Status {
  switch (status) {
    case 'todo':
      return 'doing'
    case 'doing':
      return 'done'
    case 'done':
      return 'todo'
  }
}

export const PRIORITY_LABELS: Record<Priority, string> = {
  1: 'Haute',
  2: 'Moyenne',
  3: 'Basse',
}

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { ApiError, createTask, deleteTask, getProject, updateTask } from '../api'
import { nextStatus } from '../types'
import type { Filter, Priority, Project, Task } from '../types'
import Card from '../components/Card'
import FilterBar from '../components/FilterBar'
import Status from '../components/Status'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import NotFoundPage from './NotFoundPage'

export default function ProjectPage() {
  const { id = '' } = useParams()

  const [project, setProject] = useState<Project | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)
  const [filter, setFilter] = useState<Filter>('all')

  useEffect(() => {
    let cancelled = false

    getProject(id)
      .then(({ tasks, ...data }) => {
        if (cancelled) return
        setProject(data)
        setTasks(tasks)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        if (err instanceof ApiError && err.status === 404) {
          setNotFound(true)
        } else {
          setError('Impossible de charger le projet.')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  const visibleTasks = filter === 'all' ? tasks : tasks.filter((t) => t.status === filter)
  const remaining = tasks.filter((t) => t.status !== 'done').length

  useEffect(() => {
    document.title = `(${remaining}) TaskFlow`
    return () => {
      document.title = 'TaskFlow'
    }
  }, [remaining])

  async function add(title: string, priority: Priority) {
    try {
      const created = await createTask({ projectId: id, title, status: 'todo', priority })
      setTasks((prev) => [...prev, created])
      setActionError(null)
    } catch {
      setActionError("La tâche n'a pas pu être ajoutée.")
    }
  }

  async function cycle(taskId: string) {
    const task = tasks.find((t) => t.id === taskId)
    if (!task) return
    try {
      const updated = await updateTask(taskId, { status: nextStatus(task.status) })
      setTasks((prev) => prev.map((t) => (t.id === taskId ? updated : t)))
      setActionError(null)
    } catch {
      setActionError("Le statut n'a pas pu être modifié.")
    }
  }

  async function remove(taskId: string) {
    try {
      await deleteTask(taskId)
      setTasks((prev) => prev.filter((t) => t.id !== taskId))
      setActionError(null)
    } catch {
      setActionError("La tâche n'a pas pu être supprimée.")
    }
  }

  if (notFound) {
    return <NotFoundPage />
  }

  return (
    <>
      <Link to="/" className="back-link">
        ← Tous les projets
      </Link>

      <Status loading={loading} error={error} />

      {project && (
        <>
          <h1 className="page-title">{project.name}</h1>
          <p className="muted">{project.description}</p>

          <Card title="Tâches" actions={<FilterBar value={filter} onChange={setFilter} />}>
            <TaskForm onAdd={add} />
            {actionError && (
              <p className="status-error" role="alert">
                {actionError}
              </p>
            )}
            <TaskList tasks={visibleTasks} onCycle={cycle} onRemove={remove} />
          </Card>
        </>
      )}
    </>
  )
}

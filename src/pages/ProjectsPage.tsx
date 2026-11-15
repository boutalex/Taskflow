import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { getProjects } from '../api'
import type { ProjectWithTasks } from '../types'
import Status from '../components/Status'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectWithTasks[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    getProjects()
      .then((data) => {
        if (!cancelled) setProjects(data)
      })
      .catch(() => {
        if (!cancelled) setError('Impossible de charger les projets.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Projets</h1>
        <Link to="/projects/new" className="btn-primary btn-link">
          + Nouveau projet
        </Link>
      </div>

      <Status loading={loading} error={error} />

      {!loading && !error && projects.length === 0 && <p className="empty">Aucun projet.</p>}

      {!loading && !error && projects.length > 0 && (
        <ul className="project-grid">
          {projects.map((project) => {
            const done = project.tasks.filter((t) => t.status === 'done').length
            return (
              <li key={project.id}>
                <Link to={`/projects/${project.id}`} className="project-card">
                  <h2 className="project-name">{project.name}</h2>
                  <p className="project-description">{project.description}</p>
                  <p className="project-progress">
                    {done} / {project.tasks.length} tâche(s) terminée(s)
                  </p>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}

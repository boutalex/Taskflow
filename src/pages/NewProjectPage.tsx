import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { createProject } from '../api'

const NAME_MIN = 3
const DESCRIPTION_MAX = 200

type Errors = {
  name?: string
  description?: string
}

function validate(name: string, description: string): Errors {
  const errors: Errors = {}
  if (name.trim().length < NAME_MIN) {
    errors.name = `Le nom doit contenir au moins ${NAME_MIN} caractères.`
  }
  if (description.length > DESCRIPTION_MAX) {
    errors.description = `La description ne doit pas dépasser ${DESCRIPTION_MAX} caractères.`
  }
  return errors
}

export default function NewProjectPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const errors = validate(name, description)
  const showErrors = submitted

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    if (Object.keys(errors).length > 0) return

    setSaving(true)
    setSubmitError(null)
    try {
      const project = await createProject({ name: name.trim(), description: description.trim() })
      navigate(`/projects/${project.id}`)
    } catch {
      setSubmitError("Le projet n'a pas pu être créé. Vérifiez que l'API est lancée.")
      setSaving(false)
    }
  }

  return (
    <>
      <h1 className="page-title">Nouveau projet</h1>

      <form className="project-form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="project-name">Nom du projet</label>
          <input
            id="project-name"
            type="text"
            className={showErrors && errors.name ? 'input input-error' : 'input'}
            aria-invalid={showErrors && !!errors.name}
            aria-describedby={showErrors && errors.name ? 'project-name-error' : undefined}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {showErrors && errors.name && (
            <p id="project-name-error" className="error">
              {errors.name}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="project-description">Description</label>
          <textarea
            id="project-description"
            rows={4}
            className={showErrors && errors.description ? 'input input-error' : 'input'}
            aria-invalid={showErrors && !!errors.description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <p className="hint">
            {description.length} / {DESCRIPTION_MAX}
          </p>
          {showErrors && errors.description && <p className="error">{errors.description}</p>}
        </div>

        {submitError && (
          <p className="status-error" role="alert">
            {submitError}
          </p>
        )}

        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? 'Création…' : 'Créer le projet'}
        </button>
      </form>
    </>
  )
}

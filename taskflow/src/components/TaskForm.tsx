import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { PRIORITY_LABELS } from '../types'
import type { Priority } from '../types'

const MAX_LENGTH = 80
const PRIORITIES: Priority[] = ['P1', 'P2', 'P3']

type TaskFormProps = {
  onAdd: (title: string, priority: Priority) => void
}

export default function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<Priority>('P2')
  const inputRef = useRef<HTMLInputElement>(null)

  const trimmed = title.trim()
  const isEmpty = trimmed.length === 0
  const isTooLong = title.length > MAX_LENGTH

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isEmpty || isTooLong) return
    onAdd(trimmed, priority)
    setTitle('')
    inputRef.current?.focus()
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form-row">
        <input
          ref={inputRef}
          type="text"
          placeholder="Nouvelle tâche"
          aria-label="Titre de la nouvelle tâche"
          aria-invalid={isTooLong}
          className={isTooLong ? 'input input-error' : 'input'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="select"
          aria-label="Priorité"
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {PRIORITY_LABELS[p]}
            </option>
          ))}
        </select>
        <button type="submit" className="btn-primary" disabled={isEmpty || isTooLong}>
          Ajouter
        </button>
      </div>
      {isTooLong && (
        <p className="error" role="alert">
          {MAX_LENGTH} caractères maximum
        </p>
      )}
    </form>
  )
}

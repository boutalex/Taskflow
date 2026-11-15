import { useEffect, useState } from 'react'
import type { Filter, Priority, Task } from './types'
import { nextStatus } from './types'
import { useLocalStorage } from './hooks/useLocalStorage'
import Card from './components/Card'
import FilterBar from './components/FilterBar'
import FocusTimer from './components/FocusTimer'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import ThemeToggle from './components/ThemeToggle'

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Installer Node.js 22', status: 'done', priority: 'P1' },
  { id: '2', title: 'Lire la doc de useEffect', status: 'doing', priority: 'P2' },
  { id: '3', title: 'Terminer le TP2', status: 'todo', priority: 'P1' },
]

export default function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('taskflow-tasks', INITIAL_TASKS)
  const [filter, setFilter] = useState<Filter>('all')

  const visibleTasks = filter === 'all' ? tasks : tasks.filter((t) => t.status === filter)
  const remaining = tasks.filter((t) => t.status !== 'done').length

  useEffect(() => {
    document.title = `(${remaining}) TaskFlow`
  }, [remaining])

  function add(title: string, priority: Priority) {
    const task: Task = { id: crypto.randomUUID(), title, status: 'todo', priority }
    setTasks((prev) => [...prev, task])
  }

  function cycle(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: nextStatus(t.status) } : t)),
    )
  }

  function remove(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1 className="app-title">
          TaskFlow <span className="counter">{remaining} restante(s)</span>
        </h1>
        <ThemeToggle />
      </header>

      <FocusTimer />

      <Card title="Mes tâches" actions={<FilterBar value={filter} onChange={setFilter} />}>
        <TaskForm onAdd={add} />
        <TaskList tasks={visibleTasks} onCycle={cycle} onRemove={remove} />
      </Card>
    </main>
  )
}

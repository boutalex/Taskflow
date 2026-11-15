"use client";

import { useState } from "react";
import { STATUS_LABELS } from "@/lib/types";
import type { Filter, Task } from "@/lib/types";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Toutes" },
  { value: "todo", label: "À faire" },
  { value: "doing", label: "En cours" },
  { value: "done", label: "Terminées" },
];

type TaskBoardProps = {
  tasks: Task[];
};

export default function TaskBoard({ tasks }: TaskBoardProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const visibleTasks = filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <section className="card">
      <header className="card-header">
        <h2 className="card-title">Tâches</h2>
        <div className="filter-bar" role="group" aria-label="Filtrer les tâches">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              className="filter-btn"
              aria-pressed={f.value === filter}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </header>

      {visibleTasks.length === 0 ? (
        <p className="empty">Aucune tâche à afficher.</p>
      ) : (
        <ul className="task-list">
          {visibleTasks.map((task) => (
            <li key={task.id} className="task-item">
              <span className={`badge badge-${task.status}`}>{STATUS_LABELS[task.status]}</span>
              <span className={task.status === "done" ? "task-title task-done" : "task-title"}>
                {task.title}
              </span>
              <span className={`priority priority-P${task.priority}`}>P{task.priority}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

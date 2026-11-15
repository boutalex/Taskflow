import { useEffect, useState } from 'react'
import Card from './Card'

const DURATION = 25 * 60

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export default function FocusTimer() {
  const [secondsLeft, setSecondsLeft] = useState(DURATION)
  const [running, setRunning] = useState(false)
  const finished = secondsLeft === 0
  const isRunning = running && !finished

  useEffect(() => {
    if (!isRunning) return
    const id = setInterval(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0))
    }, 1000)
    return () => clearInterval(id)
  }, [isRunning])

  function reset() {
    setRunning(false)
    setSecondsLeft(DURATION)
  }

  return (
    <Card title="Concentration">
      <div className="timer">
        <span className="timer-time" aria-live="polite">
          {formatTime(secondsLeft)}
        </span>
        <button
          type="button"
          className="btn-secondary"
          disabled={finished}
          onClick={() => setRunning((prev) => !prev)}
        >
          {isRunning ? 'Pause' : 'Démarrer'}
        </button>
        <button type="button" className="btn-secondary" onClick={reset}>
          Réinitialiser
        </button>
      </div>
    </Card>
  )
}

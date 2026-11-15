type StatusProps = {
  loading: boolean
  error: string | null
}

export default function Status({ loading, error }: StatusProps) {
  if (loading) {
    return <p className="status-loading">Chargement…</p>
  }

  if (error) {
    return (
      <p className="status-error" role="alert">
        {error}
      </p>
    )
  }

  return null
}

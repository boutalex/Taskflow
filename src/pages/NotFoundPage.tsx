import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <section className="not-found">
      <h1 className="page-title">Page introuvable</h1>
      <p className="muted">Cette page ou ce projet n'existe pas.</p>
      <Link to="/">Retour aux projets</Link>
    </section>
  )
}

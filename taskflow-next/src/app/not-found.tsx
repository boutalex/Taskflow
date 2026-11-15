import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <h1 className="page-title">Page introuvable</h1>
      <p className="muted">Cette page ou ce projet n&apos;existe pas.</p>
      <Link href="/">Retour aux projets</Link>
    </section>
  );
}

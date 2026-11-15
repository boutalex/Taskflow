export default function Loading() {
  return (
    <div aria-busy="true">
      <p className="status-loading">Chargement…</p>
      <div className="skeleton-list">
        <div className="skeleton skeleton-title" />
        <div className="skeleton" />
        <div className="skeleton" />
        <div className="skeleton" />
      </div>
    </div>
  );
}

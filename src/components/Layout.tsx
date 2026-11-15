import { NavLink, Outlet } from 'react-router'
import ThemeToggle from './ThemeToggle'

function navClass({ isActive }: { isActive: boolean }) {
  return isActive ? 'nav-link nav-link-active' : 'nav-link'
}

export default function Layout() {
  return (
    <>
      <header className="topbar">
        <nav className="nav" aria-label="Navigation principale">
          <span className="brand">TaskFlow</span>
          <NavLink to="/" end className={navClass}>
            Projets
          </NavLink>
          <NavLink to="/projects/new" className={navClass}>
            Nouveau projet
          </NavLink>
        </nav>
        <ThemeToggle />
      </header>

      <main className="app">
        <Outlet />
      </main>
    </>
  )
}

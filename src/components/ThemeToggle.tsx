import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button type="button" className="btn-secondary" onClick={toggleTheme}>
      {theme === 'light' ? 'Mode sombre' : 'Mode clair'}
    </button>
  )
}

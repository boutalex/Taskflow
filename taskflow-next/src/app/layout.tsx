import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TaskFlow",
    template: "%s · TaskFlow",
  },
  description: "Gestion de projets et de tâches",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr">
      <body>
        <header className="topbar">
          <nav className="nav" aria-label="Navigation principale">
            <span className="brand">TaskFlow</span>
            <Link href="/" className="nav-link">
              Projets
            </Link>
            <Link href="/about" className="nav-link">
              À propos
            </Link>
          </nav>
        </header>
        <main className="app">{children}</main>
      </body>
    </html>
  );
}

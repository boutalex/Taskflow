# TaskFlow — version Next.js (TP4)

La partie « lecture » du TP3 refaite avec Next.js (App Router) : liste des projets, page d'un projet avec ses
tâches filtrables, écran de chargement et page 404. Les données de `db.json` sont lues sur le serveur :
pas de React Router, pas de json-server, pas de `useEffect`.

## Lancer le projet

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Structure

| Fichier | Rôle |
| --- | --- |
| `db.json` | Données (projets et tâches), copiées du TP3 |
| `src/lib/types.ts` | Types `Task`, `Project`, `Filter`, libellés des statuts |
| `src/lib/data.ts` | `getProjects()` et `getProject(id)` lisent `db.json` |
| `src/app/layout.tsx` | `metadata` et barre de navigation commune |
| `src/app/page.tsx` | Liste des projets (composant serveur) |
| `src/app/about/page.tsx` | Page « À propos » |
| `src/app/projects/[id]/page.tsx` | Page d'un projet, `notFound()` si l'id est inconnu |
| `src/components/TaskBoard.tsx` | Seul composant client : filtre des tâches |
| `src/app/loading.tsx` | Squelette affiché pendant le chargement |
| `src/app/not-found.tsx` | Page « Page introuvable » |

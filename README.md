# TaskFlow

Application de gestion de tâches en React + TypeScript (Vite), construite au fil des TP.

## Versions en ligne (Vercel)

| TP | Branche | Adresse |
| --- | --- | --- |
| TP1 — liste de tâches typée | `tp1` | _à compléter_ |
| TP2 — persistance, minuteur et thème | `tp2` | _à compléter_ |

## TP2 — persistance, minuteur et thème

![TaskFlow v1](docs/tp2.png)

- Les tâches sont enregistrées dans le `localStorage` (clé `taskflow-tasks`) grâce au hook `useLocalStorage`.
- L'onglet affiche « (n) TaskFlow », n étant le nombre de tâches non terminées.
- Le curseur est placé dans le champ à l'ouverture et après chaque ajout.
- Chaque tâche a une priorité choisie à l'ajout : Haute (P1), Moyenne (P2), Basse (P3).
- Carte « Concentration » : minuteur de 25 minutes avec Démarrer / Pause et Réinitialiser.
- Thème clair / sombre, mémorisé dans le `localStorage` (clé `taskflow-theme`).

![Thème sombre](docs/tp2-sombre.png)

## TP1 — liste de tâches typée

![TaskFlow v0](docs/tp1.png)

Ajouter des tâches, faire tourner leur statut (À faire → En cours → Terminé), les supprimer, les filtrer,
avec un compteur de tâches restantes.

## Lancer le projet

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Structure

| Fichier | Rôle |
| --- | --- |
| `src/types.ts` | Types `Status`, `Priority`, `Task`, `Filter`, libellés, `nextStatus` |
| `src/hooks/useLocalStorage.ts` | État React synchronisé avec le `localStorage` |
| `src/context/ThemeContext.tsx` | Contexte du thème, `ThemeProvider` et hook `useTheme` |
| `src/components/Card.tsx` | Conteneur réutilisable (`title`, `actions?`, `children`) |
| `src/components/TaskForm.tsx` | Titre, priorité, validation, focus automatique |
| `src/components/FilterBar.tsx` | Quatre filtres, `aria-pressed` sur l'actif |
| `src/components/TaskItem.tsx` | Une ligne : statut cliquable, titre, priorité, bouton × |
| `src/components/TaskList.tsx` | Liste des tâches ou message si vide |
| `src/components/FocusTimer.tsx` | Minuteur de concentration |
| `src/components/ThemeToggle.tsx` | Bouton Mode sombre / Mode clair |
| `src/App.tsx` | État des tâches et du filtre, titre de l'onglet |

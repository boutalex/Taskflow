# TaskFlow — TP1 : une liste de tâches typée

Application React + TypeScript (Vite), sans serveur : ajouter des tâches, faire tourner leur statut
(À faire → En cours → Terminé), les supprimer, les filtrer, avec un compteur de tâches restantes.

**Version en ligne (Vercel) :** _à compléter après le déploiement_

![TaskFlow v0](docs/tp1.png)

## Lancer le projet

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # vérification : doit passer sans erreur
```

## Structure

| Fichier | Rôle |
| --- | --- |
| `src/types.ts` | Types `Status`, `Priority`, `Task`, `Filter`, libellés des statuts, `nextStatus` |
| `src/components/Card.tsx` | Conteneur réutilisable (`title`, `actions?`, `children`) |
| `src/components/TaskForm.tsx` | Champ contrôlé, bouton désactivé si vide, erreur au-delà de 80 caractères |
| `src/components/FilterBar.tsx` | Quatre filtres générés depuis un tableau, `aria-pressed` sur l'actif |
| `src/components/TaskItem.tsx` | Une ligne : statut cliquable, titre, priorité, bouton × |
| `src/components/TaskList.tsx` | `map` avec `key={task.id}`, message si liste vide |
| `src/App.tsx` | États `tasks` et `filter`, valeurs dérivées, `add` / `cycle` / `remove` sans mutation |

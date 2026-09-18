# Lumen UI

Système de design copy-paste. Architecture inspirée de [shadcn/ui](https://ui.shadcn.com/docs/installation), primitives [Base UI](https://base-ui.com/react/overview/quick-start), chrome du [portfolio](https://elouanb.fr/).

## Idée

Vous ne consommez pas une librairie. Vous copiez les composants. Base UI gère le comportement (focus, clavier, portails). Lumen gère le style : sidebar, papier chaud, Inter, Fraunces sur le wordmark.

## Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Base UI
- CVA + `cn()`

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir `http://localhost:3000`.

## Composants

Button, Input, Select, Textarea, Label, Badge, Card, Alert, Skeleton, Separator, DropdownMenu, NavigationMenu.

Tous vivent dans `src/components/ui/`. Copiez le fichier dont vous avez besoin, plus `src/lib/utils.ts` et les tokens de `src/app/globals.css`.

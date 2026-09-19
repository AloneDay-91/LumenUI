# Lumen UI

Copy-paste design system. Architecture inspired by [shadcn/ui](https://ui.shadcn.com/docs/installation), primitives from [Base UI](https://base-ui.com/react/overview/quick-start), chrome from the [portfolio](https://elouanb.fr/).

## Idea

You do not consume a library. You copy the components. Base UI handles behavior (focus, keyboard, portals). Lumen handles style: sidebar, warm paper, Inter, Fraunces on the wordmark.

## Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Base UI
- CVA + `cn()`

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Components

Button, Input, Select, Textarea, Label, Badge, Card, Alert, Skeleton, Separator, DropdownMenu, NavigationMenu.

They all live in `src/components/ui/`. Copy the file you need, plus `src/lib/utils.ts` and the tokens from `src/app/globals.css`.

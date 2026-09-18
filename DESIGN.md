# DESIGN.md

Lumen UI — papier, pills, deux chromes : header marketing, sidebar docs.

## Scene

Landing lue comme [Layera](https://layera.elouanb.fr/) : header, mega menu pleine largeur. Documentation lue comme le portfolio : sidebar fixe, colonne `lg:max-w-4xl lg:p-20`. Light par défaut. Dark = `#111`.

## Color strategy

Neutres teintés chaud (hue 90). Un seul contraste : noir / papier. Destructive reste le seul écart.

- Light background: `oklch(0.99 0.003 90)`
- Dark background: `#111`
- Primary: quasi-noir (light) / quasi-blanc (dark)
- Cards: `ring-1 ring-foreground/5`, à plat, pas d’ombre

Interdit : bleu interactif, violet IA, titres 7xl.

## Typography

- Inter (`font-sans`) — corps `text-sm`, h1 docs `text-xl md:text-2xl`, h2 `text-sm font-medium`
- Fraunces (`font-serif`) — wordmark uniquement
- JetBrains Mono (`font-mono`) — code

## Layout

- Marketing : header `px-6 py-6 md:px-12`. NavigationMenu = mega menu pleine largeur (triggers `text-sm text-muted-foreground`, panneau overlay `absolute` sous la barre, `border-b`, le contenu reste en place).
- Docs : layout Polar / Medusa / Mintlify — header + recherche ⌘K, sidebar groupée, article, TOC « Sur cette page », fil d’Ariane, pager. Tokens et composants Lumen, pas le chrome Polar.
- Portals : `.root { isolation: isolate }` pour Dialog, Menu, Select, Popover, Tooltip, Toast.
- Hero landing : photo + carte intérieure `bg-secondary rounded-lg`
- Listes : lignes + `Separator`

## Components

- Buttons: `rounded-full`, `text-xs`, `h-8`
- Inputs / Select: `h-8 rounded-2xl border-transparent bg-input/50`
- Cards: `rounded-[min(var(--radius-4xl),24px)]`
- Badges: `h-5 rounded-2xl`
- Theme: dropdown (clair / sombre)

## Portals

`.root { isolation: isolate }` pour que Select / Menu / NavigationMenu passent au-dessus.

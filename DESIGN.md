# DESIGN.md

Lumen UI — papier, pills, deux chromes : header marketing, sidebar docs.

## Scene

Landing lue comme [Layera](https://layera.elouanb.fr/) : header, mega menu pleine largeur. Documentation lue comme le portfolio : sidebar fixe, colonne `lg:max-w-4xl lg:p-20`. Light par défaut. Dark = `#111`.

## Color strategy

Neutres teintés chaud (hue 90). Le chrome reste encre sur papier. Les teintes servent aux statuts, pas aux actions primaires.

- Light background: `oklch(0.99 0.003 90)`
- Dark background: `#111`
- Primary: quasi-noir (light) / quasi-blanc (dark)
- Cards: `ring-1 ring-foreground/5`, à plat, pas d’ombre
- Statuts : gray, indigo, cyan, orange, crimson, jade — encre, wash, panel, solid. Badge, Callout et Alert les partagent. Le bouton primaire ne les prend pas.

Interdit : violet IA, titres 7xl, un bleu comme couleur d’action.

## Typography

- Inter (`font-sans`) — corps `text-sm`, h1 docs `text-xl md:text-2xl`, h2 `text-sm font-medium`
- Fraunces (`font-serif`) — police de titre optionnelle (Customize) ; le logo (symbole + texte) vient du kit, voir `LogoSprite`
- JetBrains Mono (`font-mono`) — code

## Layout

- Marketing : header `px-6 py-6 md:px-12`. NavigationMenu = mega menu pleine largeur (triggers `text-sm text-muted-foreground`, panneau overlay `absolute` sous la barre, `border-b`, le contenu reste en place).
- Docs : layout Polar / Medusa / Mintlify — header + recherche ⌘K, sidebar groupée, article, TOC « Sur cette page », fil d’Ariane, pager. Tokens et composants Lumen, pas le chrome Polar.
- Portals : `.root { isolation: isolate }` pour Dialog, Menu, Select, Popover, Tooltip, Toast.
- Hero landing : peinture pleine largeur (masque transparent → opaque → transparent, effacée avant le fondu de la carte), aperçu à plat de la vraie page de doc Button (`HeroDocs`, `rounded-[min(var(--radius-4xl),24px)]`) rogné par un masque bas, `aria-hidden` + `inert`, sans ombre ni élément flottant
- Listes : lignes + `Separator`

## Components

- Buttons: `rounded-full`, `text-xs`, `h-8`
- CTA hero : taille par défaut (`h-8 text-xs rounded-full`), pastille primaire = commande d'installation copiable
- Inputs / Select: `h-8 rounded-2xl border-transparent bg-input/50`
- Cards: `rounded-[min(var(--radius-4xl),24px)]`
- Badges: `h-5 rounded-2xl`
- Theme: `ThemeToggle`, bouton soleil / lune

## Portals

`.root { isolation: isolate }` pour que Select / Menu / NavigationMenu passent au-dessus.

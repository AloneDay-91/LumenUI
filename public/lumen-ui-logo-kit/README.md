# Lumen UI — kit de logo

Logo monochrome de **Lumen UI** : un disque en pixels qui se dissout en damier selon la diagonale, comme une sphère éclairée par une lumière rasante.

- **K2 — symbole principal** (grille 9×9, dégradé diagonal) : à utiliser au-dessus de **~24 px**.
- **K4 — symbole petite taille** (grille 7×7, dégradé gauche → droite, très léger arrondi) : à utiliser **en dessous de ~24 px** (favicons, onglets, petites UI).
- **Wordmark** : « Lumen UI » en Inter (graisse ~560), vectorisé en tracés (aucune police requise).

## Couleurs (une seule couleur par logo)

| Nom | Hex | Usage |
|---|---|---|
| `black` | `#171717` | logo sur fond clair (fond conseillé `#fcfcf9`) |
| `light` | `#f5f4ef` | logo sur fond sombre (fond conseillé `#111111`) |
| `pure-black` | `#000000` | impression, contextes noir pur (sur `#ffffff`) |
| `pure-white` | `#ffffff` | contextes blanc pur (sur `#000000`) |

Ne jamais colorer, dégrader, ombrer ni déformer le logo. Le symbole et le texte sont toujours de la même couleur.

## Arborescence

```
svg/
  symbol/             K2 — lumen-symbol-{couleur}.svg et -on-bg.svg
  symbol-small/       K4 — lumen-symbol-small-{couleur}.svg et -on-bg.svg
  lockup-horizontal/  symbole + « Lumen UI » côte à côte
  lockup-stacked/     symbole au-dessus du texte
  wordmark/           « Lumen UI » seul
png/
  symbol/{couleur}/ et symbol/{couleur}-on-bg/            64, 128, 256, 512, 1024, 2048 px
  symbol-small/{couleur}/ et symbol-small/{couleur}-on-bg/ idem
  lockup-horizontal/, lockup-stacked/, wordmark/           1024 et 2048 px de large (transparent et -on-bg)
favicon/
  favicon.ico (16/32/48), favicon-16.png, favicon-32.png, favicon-48.png
  icon.svg            K4, s'adapte au mode sombre (prefers-color-scheme)
app-icon/
  apple-touch-icon.png (180, K2 sur #111), android-chrome-192x192.png, android-chrome-512x512.png
  maskable-512x512.png (marge de sécurité ≥ 20 %), site.webmanifest
social/
  og-image-dark.png / og-image-light.png (1200×630) + SVG
head-snippet.html     balises <head> prêtes à coller
overview.png          planche récapitulative
final_build.py, overview.py   scripts de génération (Python + cairosvg + shapely + fontTools)
```

`-on-bg` = version posée sur son fond plein (`#fcfcf9`, `#111111`, `#ffffff` ou `#000000`) ; sinon fond transparent.

## Règles d'usage

- **Zone de protection** : laisser autour du logo un espace libre au moins égal à **2 modules (pixels) du symbole**, soit environ ¼ de la hauteur du symbole. Pour le lockup horizontal, au minimum la hauteur du « L » de Lumen × 0,5 de chaque côté.
- **Tailles minimales** :
  - Symbole K2 : 24 px (écran) / 8 mm (impression). En dessous, utiliser K4.
  - Symbole K4 : 16 px minimum (les favicons sont alignés sur la grille de pixels : 1 module = 2 px à 16 px, 4 px à 32 px).
  - Lockup horizontal : 100 px de large / 30 mm. Wordmark seul : 80 px de large.
- Pour un rendu net, afficher le symbole à des tailles multiples de la grille quand c'est possible (K2 : multiples de 9 px, K4 : multiples de 7 px ou 8 px avec la marge des favicons).
- Ne pas changer l'espacement symbole/texte, ni recomposer le texte dans une autre police.

## Intégration web

1. Copier le contenu de `favicon/` et `app-icon/` dans le dossier public du site (ex. `public/` ou `app/` avec Next.js).
2. Coller `head-snippet.html` dans le `<head>` (ou l'équivalent `metadata` de Next.js).
3. Utiliser `social/og-image-dark.png` comme image Open Graph.

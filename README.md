# Lumen UI Design System

Un design system moderne pour créer des interfaces utilisateur élégantes et accessibles.

## 🎯 Philosophie

**Lumen UI n'est pas une librairie npm.** C'est une collection de composants réutilisables que vous **copiez et collez** dans vos projets. Vous possédez le code, vous pouvez le personnaliser sans limite et il n'y a aucune dépendance à maintenir.

## 🚀 Démarrage rapide

1. **Installez les dépendances**
```bash
npm install -D tailwindcss postcss autoprefixer
npm install class-variance-authority clsx tailwind-merge
```

2. **Copiez les styles globaux**
Visitez `/docs/styles` pour copier les variables CSS Lumen UI

3. **Copiez les composants**
Parcourez la documentation et copiez les composants dont vous avez besoin

## 📦 Composants disponibles

### Formulaires
- **Button** - Boutons avec variants (default, secondary, outline, ghost, destructive)
- **Input** - Champs de saisie stylisés
- **Label** - Labels accessibles pour formulaires
- **Select** - Select natif stylisé
- **Textarea** - Zone de texte multiligne

### Affichage
- **Alert** - Alertes avec variants (default, destructive, warning, success, info)
- **Badge** - Badges pour statuts et étiquettes
- **Card** - Cartes avec header, content, footer
- **Skeleton** - États de chargement placeholder

## 🎨 Design Tokens

Le système utilise des variables CSS avec une architecture à deux niveaux :

### Variables de base Lumen UI
- `--lumen-surface-*` - Couleurs de surface
- `--lumen-text-*` - Couleurs de texte
- `--lumen-stroke-*` - Couleurs de bordure
- `--lumen-action-*` - Couleurs d'action

### Variables sémantiques
- `--background` - Couleur de fond
- `--foreground` - Couleur de texte
- `--primary` - Couleur primaire
- `--destructive` - Couleur destructive
- `--border` - Couleur de bordure
- `--muted` - Couleur atténuée

### Support du mode sombre
Toutes les variables sont automatiquement adaptées pour le mode sombre via la classe `.dark`.

## 🛠️ Stack technique

- **Next.js 15** - Framework React
- **React 19** - Bibliothèque UI
- **Tailwind CSS 4** - Framework CSS
- **TypeScript** - Typage statique
- **Radix UI** - Primitives accessibles
- **CVA** - Class Variance Authority

## 📚 Documentation

Lancez le projet pour accéder à la documentation complète :

```bash
npm run dev
```

Puis visitez `http://localhost:3000/docs`

## 🎯 Structure du projet

```
src/
├── app/
│   ├── (docs)/
│   │   └── docs/
│   │       ├── page.tsx              # Introduction
│   │       ├── installation/         # Guide d'installation
│   │       ├── styles/               # Variables CSS
│   │       └── components/           # Documentation des composants
│   └── globals.css                   # Variables CSS Lumen UI
├── components/
│   ├── ui/                          # Composants réutilisables
│   │   ├── Alert.tsx
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Label.tsx
│   │   ├── Select.tsx
│   │   ├── Skeleton.tsx
│   │   └── Textarea.tsx
│   └── docs/                        # Composants de documentation
│       ├── CodeBlock.tsx            # Bloc de code avec copie
│       ├── DocsNav.tsx              # Navigation
│       └── HeadingsSetter.tsx       # Gestion des headings
└── lib/
    └── utils.ts                     # Utilitaires (cn)
```

## 💡 Utilisation

### Exemple : Button

1. Copiez le code depuis `/docs/components/button`
2. Collez-le dans `components/ui/Button.tsx`
3. Utilisez-le :

```tsx
import { Button } from "@/components/ui/Button";

export default function Page() {
  return (
    <Button variant="default">
      Click me
    </Button>
  );
}
```

## 🎨 Personnalisation

Modifiez les variables CSS dans `globals.css` pour adapter les couleurs à votre marque :

```css
:root {
  --primary: #votre-couleur;
  --radius: 8px;
  /* etc. */
}
```

Créé avec ❤️ pour faciliter le développement d'interfaces modernes et accessibles.

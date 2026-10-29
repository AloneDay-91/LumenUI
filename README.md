![Lumen UI](src/app/icon.svg)

# Lumen UI

Copy-paste design system. Base UI for behavior. Warm paper chrome in your repo.

![Version](https://img.shields.io/github/v/tag/AloneDay-91/LumenUI?label=version&color=171717&style=flat-square)![Stars](https://img.shields.io/github/stars/AloneDay-91/LumenUI?style=flat-square&color=171717)![Last commit](https://img.shields.io/github/last-commit/AloneDay-91/LumenUI?style=flat-square&color=555)![Next.js 16](https://img.shields.io/badge/Next.js-16-171717?style=flat-square)![React 19](https://img.shields.io/badge/React-19-171717?style=flat-square)![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-v4-171717?style=flat-square)![Base UI](https://img.shields.io/badge/Base_UI-1.8-171717?style=flat-square)

[Getting started](https://github.com/AloneDay-91/LumenUI#getting-started) · [Components](https://github.com/AloneDay-91/LumenUI/tree/main/src/components/ui) · [Changelog](https://github.com/AloneDay-91/LumenUI/blob/main/src/lib/changelog.ts)

---

You do not consume a package. You copy the file. [Base UI](https://base-ui.com/react/overview/quick-start) handles focus, keyboard, and portals. Lumen handles style: ink on paper, pills, Inter, Fraunces on the wordmark.

Architecture follows the [shadcn/ui](https://ui.shadcn.com/docs/installation) model (CVA, tokens, `cn()`) without its CLI or chrome. Visual language from the [portfolio](https://elouanb.fr/).

## Features

- **50+ components** — forms, overlays, navigation, and native pieces (Table, Stepper, Command, Timeline…)
- **Copy-paste** — the source lives in `src/components/ui/`
- **Tokens** — semantic CSS variables, light and dark, no interactive blue
- **Docs** — Polar / Medusa layout, API tabs, live previews, changelog

## Stack

| Layer | Choice |
| --- | --- |
| App | Next.js 16, React 19 |
| Style | Tailwind CSS 4, CVA, `cn()` |
| Behavior | Base UI 1.8 |
| Theme | `next-themes` |
| Type | TypeScript |

## Getting started

```bash
git clone https://github.com/AloneDay-91/LumenUI.git
cd LumenUI
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Docs live at `/docs`.

Node 22.23.4 is required (`engines` in `package.json`).

## CLI

```bash
npx @aloneday/lumenui@latest init
npx @aloneday/lumenui@latest add button
```

`init` writes `lumen.json`, `cn()`, and `globals.css`. `add` copies the component and writes that stylesheet when the project does not already have the Lumen tokens.

## Copy a component

1. Install the shared dependencies:

```bash
npm install @base-ui/react class-variance-authority clsx tailwind-merge
npm install -D tailwindcss @tailwindcss/postcss tw-animate-css
```

2. Paste the tokens from `src/app/globals.css` (or the sheet on the Styles docs page). The CLI writes this file for you.
3. Copy `src/lib/utils.ts`.
4. Copy the file you need from `src/components/ui/`.

## Documentation

| Page | What it is |
| --- | --- |
| `/docs` | Introduction |
| `/docs/installation` | CLI, dependencies, tokens, `cn()` |
| `/docs/styles` | Palette, type, theming |
| `/docs/components/button` | First component to copy |
| `/docs/changelog` | Release notes |
| `/examples` | Composed usages, outside the docs chrome |

## Changelog

Latest: **v1.0.7** — Data List, Theme Toggle, drawer and toast motion, sidebar hydration, pointer cursors, the CLI stylesheet, and the Customize preview.

See [`src/lib/changelog.ts`](src/lib/changelog.ts).

## Source

[github.com/AloneDay-91/LumenUI](https://github.com/AloneDay-91/LumenUI) — clone it, copy what you need.

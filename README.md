<p align="center">
  <img src="src/app/icon.svg" width="48" height="48" alt="Lumen UI" />
</p>

<h1 align="center">Lumen UI</h1>

<p align="center">
  Copy-paste design system. Base UI for behavior. Warm paper chrome in your repo.
</p>

<p align="center">
  <a href="https://github.com/AloneDay-91/LumenUI/releases/tag/v0.5.0"><img src="https://img.shields.io/github/v/tag/AloneDay-91/LumenUI?label=version&color=171717&style=flat-square" alt="Version" /></a>
  <a href="https://github.com/AloneDay-91/LumenUI/stargazers"><img src="https://img.shields.io/github/stars/AloneDay-91/LumenUI?style=flat-square&color=171717" alt="Stars" /></a>
  <a href="https://github.com/AloneDay-91/LumenUI/commits/main"><img src="https://img.shields.io/github/last-commit/AloneDay-91/LumenUI?style=flat-square&color=555" alt="Last commit" /></a>
  <img src="https://img.shields.io/badge/Next.js-16-171717?style=flat-square" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-171717?style=flat-square" alt="React 19" />
  <img src="https://img.shields.io/badge/Tailwind-v4-171717?style=flat-square" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Base_UI-1.8-171717?style=flat-square" alt="Base UI" />
</p>

<p align="center">
  <a href="https://github.com/AloneDay-91/LumenUI#getting-started">Getting started</a>
  ·
  <a href="https://github.com/AloneDay-91/LumenUI/tree/main/src/components/ui">Components</a>
  ·
  <a href="https://github.com/AloneDay-91/LumenUI/blob/main/src/lib/changelog.ts">Changelog</a>
</p>

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

Node 22 is required (`engines` in `package.json`).

## Copy a component

1. Install the shared dependencies:

```bash
npm install @base-ui/react class-variance-authority clsx tailwind-merge
npm install -D tailwindcss @tailwindcss/postcss tw-animate-css
```

2. Paste the tokens from `src/app/globals.css` (or the sheet on the Styles docs page).
3. Copy `src/lib/utils.ts`.
4. Copy the file you need from `src/components/ui/`.

## Documentation

| Page | What it is |
| --- | --- |
| `/docs` | Introduction |
| `/docs/installation` | Dependencies, tokens, `cn()` |
| `/docs/styles` | Palette, type, theming |
| `/docs/components/button` | First component to copy |
| `/docs/changelog` | Release notes |
| `/examples` | Composed usages, outside the docs chrome |

## Changelog

Latest: **v0.5.0** — native components, logo favicon, full-width previews.

See [`src/lib/changelog.ts`](src/lib/changelog.ts) or the [v0.5.0 tag](https://github.com/AloneDay-91/LumenUI/releases/tag/v0.5.0).

## Source

[github.com/AloneDay-91/LumenUI](https://github.com/AloneDay-91/LumenUI) — clone it, copy what you need.

<img src="src/app/icon.svg" alt="Lumen UI" width="48" height="48">

# Lumen UI

Copy-paste design system. Base UI for behavior. Warm paper chrome in your repo.

![Version](https://img.shields.io/github/v/tag/AloneDay-91/LumenUI?label=version&color=171717&style=flat-square)![Stars](https://img.shields.io/github/stars/AloneDay-91/LumenUI?style=flat-square&color=171717)![Last commit](https://img.shields.io/github/last-commit/AloneDay-91/LumenUI?style=flat-square&color=555)![Next.js 16](https://img.shields.io/badge/Next.js-16-171717?style=flat-square)![React 19](https://img.shields.io/badge/React-19-171717?style=flat-square)![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-v4-171717?style=flat-square)![Base UI](https://img.shields.io/badge/Base_UI-1.8-171717?style=flat-square)

[Use it](https://github.com/AloneDay-91/LumenUI#use-lumen-in-your-app) · [Components](https://github.com/AloneDay-91/LumenUI/tree/main/src/components/ui) · [Changelog](https://github.com/AloneDay-91/LumenUI/blob/main/src/lib/changelog.ts)

---

You do not consume a package. You copy the file. [Base UI](https://base-ui.com/react/overview/quick-start) handles focus, keyboard, and portals. Lumen handles style: ink on paper, pills, Inter, Fraunces on the wordmark.

Architecture follows the [shadcn/ui](https://ui.shadcn.com/docs/installation) model (CVA, tokens, `cn()`) without its CLI or chrome. Visual language from the [portfolio](https://elouanb.fr/).

## Features

- **50+ components** — forms, overlays, navigation, and native pieces (Table, Stepper, Command, Timeline…)
- **Copy-paste** — the source lives in `src/components/ui/`
- **Tokens** — semantic CSS variables, light and dark, plus status hues for badges, callouts, and alerts
- **Docs** — Polar / Medusa layout, API tabs, live previews, changelog

## Stack

| Layer | Choice |
| --- | --- |
| App | Next.js 16, React 19 |
| Style | Tailwind CSS 4, CVA, `cn()` |
| Behavior | Base UI 1.8 |
| Theme | `next-themes` |
| Type | TypeScript |

## Use Lumen in your app

In a React 19 app (Next.js, Vite, React Router, Astro, TanStack Start), with Node 22.23.4 or newer:

```bash
npx @aloneday/lumenui@latest init        # lumen.json, cn(), globals.css, Tailwind CSS 4
npx @aloneday/lumenui@latest add button  # copies components/ui/Button.tsx and its files
```

Then import `globals.css` in the root layout, load the fonts, and wrap the app in `<div className="root">`. The full walkthrough, with the layout to copy, is at [`/docs/installation`](https://ui.elouanb.fr/docs/installation); other frameworks are at [`/docs/frameworks`](https://ui.elouanb.fr/docs/frameworks).

A file you edited is never replaced: `add` skips it unless you pass `--overwrite`. `rm`, `list` and `preset` are described in the [CLI reference](https://ui.elouanb.fr/docs/installation#cli). Without the CLI, follow [manual installation](https://ui.elouanb.fr/docs/installation#manual).

## Work on this repo

```bash
git clone https://github.com/AloneDay-91/LumenUI.git
cd LumenUI
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Docs live at `/docs`.

Node 22.23.4+ or 24.22.1+ is required (`engines` in `package.json`; `.nvmrc` pins 22.23.4).

```bash
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
npm test            # CLI tests (node:test)
npm run registry    # rebuild cli/registry and public/r after editing src/components/ui
```

## Commits and releases

Commits follow [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): description`. A `commit-msg` hook (commitlint + husky, set up by `npm install`) checks each message, and CI checks every commit of a pull request.

| Commit | Example | Next version |
| --- | --- | --- |
| `fix:` / `perf:` | `fix(sidebar): smooth the collapse` | 1.0.7 → 1.0.8 |
| `feat:` | `feat(cli): add --overwrite` | 1.0.7 → 1.1.0 |
| `feat!:` or a `BREAKING CHANGE:` footer | `feat(cli)!: rename lumen.json` | 1.0.7 → 2.0.0 |
| `docs`, `chore`, `refactor`, `style`, `test`, `build`, `ci` | `docs: rewrite installation` | no release |

Releases are handled by [release-please](https://github.com/googleapis/release-please-action) (`.github/workflows/release-please.yml`):

1. Merge `develop` into `main`. release-please opens or updates a **release PR** that bumps `package.json`, `cli/package.json` and `CHANGELOG.md`.
2. Merge the release PR when you want to ship. release-please tags `vX.Y.Z` and publishes the GitHub Release.
3. The release starts `cli.yml`, which publishes `@aloneday/lumenui` at the same version.
4. Merge `main` back into `develop`, so the version bump is not lost.

`src/lib/changelog.ts` (the site changelog and the update banner) stays hand-written: add the entry in the release PR before merging it.

One-time GitHub setup: Settings → Actions → General → "Read and write permissions" and "Allow GitHub Actions to create and approve pull requests". A release made with the default `GITHUB_TOKEN` does not start other workflows, so add a `RELEASE_PLEASE_TOKEN` secret (fine-grained token on this repo: Contents, Pull requests and Issues in read and write) for the CLI to publish on its own. Without it, run "Publish CLI" by hand on the new tag.

## Documentation

| Page | What it is |
| --- | --- |
| `/docs` | Introduction |
| `/docs/installation` | Five steps from a React app to your first component, CLI reference, troubleshooting |
| `/docs/frameworks` | Setup for Vite, React Router, Astro and TanStack Start |
| `/docs/components` | Every component, grouped, with its `add` command |
| `/docs/styles` | Palette, type, theming |
| `/docs/components/button` | First component to copy |
| `/docs/changelog` | Release notes |

## Changelog

Latest: **v1.1.0** — a rewritten installation path, Choose and From shadcn, an accessibility page, recipes, a Sidebar that opens on hover, a CLI that keeps your edits, and a docs preview in the hero. Versions and `CHANGELOG.md` are managed by release-please.

See [`src/lib/changelog.ts`](src/lib/changelog.ts).

## License

[MIT](LICENSE)

## Source

[github.com/AloneDay-91/LumenUI](https://github.com/AloneDay-91/LumenUI) — clone it, copy what you need.

# design-sync notes — Lumen UI

## How this repo is synced

- **No dist/.** Lumen UI is copy-paste source. `cfg.buildCmd` (`node .design-sync/build.mjs`)
  synthesizes the package the converter reads, under `.design-sync/.cache/pkg/`:
  - `index.mjs` — barrel `export *` over every `src/components/ui/[A-Z]*.tsx` (all 308 exports,
    subparts included, land on `window.LumenUI`), first line imports `.design-sync/head.css`.
  - `index.d.ts` — **roots only**: the 67 components listed in `src/lib/docs-nav.ts`
    (`componentGroups`). One card + `.d.ts` per documented component; subparts (CardHeader,
    DropdownMenuItem…) are documented in the parent's `.prompt.md` via the docs API tables.
    Declarations come from `tsc` (emitDeclarationOnly) with `@/` rewritten to relative paths.
  - `docs/<Name>.md` — rendered by the site's own `getDocsMarkdown` (`src/lib/docs-markdown.ts`,
    bundled by `.design-sync/gen-docs.ts` with the staged esbuild), minus Installation/Source;
    frontmatter `category` = docs-nav section → card group.
  - `lumen.css` — `.design-sync/lumen.css` (`@import "../src/app/globals.css"`) compiled by
    Tailwind v4 via `@tailwindcss/postcss`, auto source detection from the repo root.
- **Stage `.ds-sync/` (and `npm i esbuild ts-morph @types/react playwright` there) BEFORE
  `buildCmd`** — build.mjs imports esbuild from `.ds-sync/node_modules`.
- Docs title → export exceptions live in `gen-docs.ts` `EXPORT_NAME` (`Toast` → `ToastProvider`).
- `head.css` exists for CSS order: esbuild puts component CSS (`callout.css`, `tabs.css`,
  `typography.css`, all `@layer components`) before the appended Tailwind output, which would make
  `components` the lowest layer (preflight/base would win). head.css declares
  `@layer properties, theme, base, components, utilities;` first, and carries the Google Fonts
  `@import` (Inter, Fraunces, JetBrains Mono — what `next/font/google` loads on the site) so it
  stays at the top of `_ds_bundle.css`.
- Guidelines: only `DESIGN.md` (`guidelinesGlob`) — the default glob would sweep the generated docs.
- Render check / capture browser: no Playwright Chromium download; use the installed Chrome:
  `DS_CHROMIUM_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`.

## Preview authoring

- Previews import components from `"lumen-ui"` and icons from `"lucide-react"` (bundled per preview).
- Port from `src/app/(docs)/docs/components/<slug>/page.tsx` (+ `src/components/docs/*Examples.tsx`).
- **Tailwind classes in previews only exist in the CSS after a full `build.mjs` run** (it scans
  `.design-sync/previews/`). `preview-rebuild.mjs` does NOT recompile CSS. Prefer utilities already
  used in `src/` (grep `ds-bundle/_ds_bundle.css`), else inline `style`.
- Overlays use `cardMode: single` (config `overrides`) and should render open (`defaultOpen`).
  Wide components (Sidebar, Table, Chart, Carousel) use `cardMode: column`.

## Known render warns

- `[TOKENS_MISSING]` (~29 vars): Base UI runtime vars (`--transform-origin`, `--anchor-width`,
  `--available-height`, `--active-tab-*`, `--accordion-panel-height`, `--collapsible-panel-height`,
  `--toast-*`, `--drawer-swipe-*`), Tailwind defaults with fallbacks (`--default-*font-*`),
  next/font vars with family-name fallbacks (`--font-inter|fraunces|jetbrains`), and vars set
  inline by components (`--sidebar-width*`, `--swatch`). All expected.
- `[DTS_STYLE_SYSTEM] filtering @types/react props` — informational.
- `[RENDER_BLANK]`/`[RENDER_THIN]` on floor cards disappear once a component has an authored preview.

## Preview gotchas (from the first sync's authoring waves)

- Recharts: Chart.tsx wraps recharts but doesn't re-export primitives. The barrel exposes the
  bundle's single copy as `window.LumenUI.Recharts` (`import { Recharts } from "lumen-ui"`). Never
  import `recharts` directly in a preview — a second copy can't see the wrappers' chart store
  (grid/axes/legend render nothing). Same rule for any lib a Lumen wrapper uses via context.
  Use `isAnimationActive={false}` on series so captures aren't mid-draw.
- Base UI flex-col roots (NumberField, Menubar, DatePicker in a grid) stretch to the cell: `w-40`/`w-fit`
  or wrap in `flex flex-col items-start`.
- Select: pass `items` (`[{value,label}]`) on the root or the closed trigger shows the raw value.
- ContextMenu open state: dispatch a synthetic `contextmenu` MouseEvent inside the trigger from a
  `useEffect` (`defaultOpen` anchors at viewport 0,0).
- Toasts: `useToastManager().add({ ..., timeout: 0 })` in a ref-guarded `useEffect`.
- Sidebar: `SidebarProvider` is `h-svh` — constrain with inline height (600–660px) + `min-h-0`.
- NavigationMenu open: root `defaultValue`; panel rebuilt from NavigationMenu* parts (MegaMenuPanel is marketing code).
- Calendar needs `defaultMonth` (else capture-date dependent). Carousel: no autoplay.
- Avoid `<Input type="file">` — capture Chrome is French ("Choisir un fichier").
- Check compiled classes with the escaped form: `grep -cF 'w-1\/3' ds-bundle/_ds_bundle.css`.

## Source findings (reported to the maintainer, not fixed by the sync)

- Disabled styling never applies on span-rooted Base UI controls: Checkbox, Switch, RadioGroupItem
  use `disabled:opacity-50` but render `<span data-disabled>`; Slider has no disabled style; Label's
  `peer-disabled` can't fire (control is a child). ToolbarButton keys off `:disabled` but Base UI sets
  `data-disabled`. Fix: `data-disabled:opacity-50` (+ `has-data-disabled:` on Label). Previews omit
  those disabled states (Checkbox previews add `data-disabled:opacity-50` themselves).
- `TooltipContent` / `PreviewCardContent` accept `side` but spread it onto the Popup, not the
  Positioner — `side` is ignored, tooltips always open on top.
- Select docs example omits `items`.

## States not shown (can't render statically)

Open popovers of DatePicker/ColorPicker (no `open` prop), Autocomplete/Combobox/Select lists,
Breadcrumb ellipsis menu, Sidebar hover/toggle/dropdowns; two-thumb Slider (wrapper renders one
thumb); Checkbox indeterminate (same icon as checked); ThemeToggle dark state (no ThemeProvider in
cards — it renders the sun icon, click is a no-op); Chart tooltips; hover/focus everywhere.

## Re-sync risks

- `build.mjs` depends on the docs-markdown generator's shape (`getDocsMarkdown`, `## Installation` /
  `## Source` headings) and on `componentGroups` in docs-nav.ts — a new docs page = a new card;
  a renamed page title must still match an export (else add to `EXPORT_NAME` in gen-docs.ts).
- `lumen.css` imports `src/app/globals.css` live; the `@source inline()` safelist in it is hand-kept —
  add new token families there when globals.css gains them (conventions.md documents that vocabulary).
- Fonts load at runtime from Google Fonts (not shipped in `fonts/`); offline renders fall back.
- Previews that seed state from effects (ContextMenu event, toasts) are timing-dependent (50 ms timeout).
- Capture browser is the locally installed Chrome (`DS_CHROMIUM_PATH`), not a pinned Chromium.

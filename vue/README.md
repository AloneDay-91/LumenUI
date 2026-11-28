# Lumen UI for Vue

Vue 3 sources of the Lumen components, built on [Reka UI](https://reka-ui.com/). The CLI copies them into an app with `lumenui add <name> --framework vue`; `npm run registry` at the repo root turns this folder into `cli/registry/registry-vue.json` and `public/r/vue`.

```bash
npm install
npm run dev        # playground with every component, on http://localhost:5174
npm run typecheck  # vue-tsc
npm run build
```

`src/globals.css` is generated from `src/lib/lumen-css.ts` before each script, so the playground uses the stylesheet the CLI installs.

## Examples

`src/examples/<docs-slug>.vue` is the example the docs show under the Vue tab of that component's page. The playground renders them all (`#/button` shows one). `npm run registry` at the repo root turns them into `src/lib/vue-examples.ts`.

## Porting a component

See [PORTING.md](PORTING.md).

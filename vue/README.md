# Lumen UI for Vue

Vue 3 sources of the Lumen components, built on [Reka UI](https://reka-ui.com/). The CLI copies them into an app with `lumenui add <name> --framework vue`; `npm run registry` at the repo root turns this folder into `cli/registry/registry-vue.json` and `public/r/vue`.

```bash
npm install
npm run dev        # playground with every component, on http://localhost:5174
npm run typecheck  # vue-tsc
npm run build
```

`src/globals.css` is generated from `src/lib/lumen-css.ts` before each script, so the playground uses the stylesheet the CLI installs.

## Porting a component

1. Read the React file in `src/components/ui/` and keep its classes and `data-slot` names.
2. Make a folder `src/components/ui/<slug>/` with one `.vue` file per part and an `index.ts` that exports them (and any `cva` variants).
3. Map Base UI states to Reka: `data-open:` → `data-[state=open]:`, `data-checked:` → `data-[state=checked]:`, `data-active:` → `data-[state=active]:`, `--transform-origin` → `--reka-popper-transform-origin`. Shared strings are in `styles.ts`.
4. Add it to `src/App.vue`, run `npm run typecheck`, then `npm run registry` at the root and add its usage to `src/lib/vue-components.ts`.

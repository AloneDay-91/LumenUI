# Porting a Lumen component to Vue

Source of truth: the React file `src/components/ui/<Name>.tsx` (and any `.css` it imports).
Target: `vue/src/components/ui/<slug>/`, where `<slug>` is the kebab-case registry name
(`DatePicker.tsx` → `date-picker`, `OTPField.tsx` → `otp-field`). Look at the ported
components already there (button, dialog, select, tabs, dropdown-menu, field…) and copy their style.

## Files

- One `.vue` file per exported React component part, named like the React export
  (`Dialog.vue`, `DialogContent.vue`…), plus `index.ts` exporting every part with the same
  names as the React file: `export { default as DialogContent } from "./DialogContent.vue"`.
- `cva` variants, types and constants go in `index.ts` (or a `.ts` file in the folder) with the
  same export names as React (`buttonVariants`, `BadgeColor`…).
- A `.css` file the React component imports is copied into the folder and imported from the
  `.vue` file that needs it (`import "./marquee.css"`), with selectors adapted if they target
  Base UI data attributes.
- An example: `vue/src/examples/<docs-slug>.vue` that reproduces the main `preview={…}` of
  `src/app/(docs)/docs/components/<docs-slug>/page.tsx` (with the state it needs). Docs slug =
  registry slug. It is shown in the docs under the Vue tab, so keep it short and idiomatic. Names in
  examples: Alex Martin, alex.martin@example.com — never a real person.

## Rules

- Same visuals: keep every Tailwind class and `data-slot` value from React. Only translate what
  Reka needs:
  - `data-open:` → `data-[state=open]:`, `data-closed:` → `data-[state=closed]:`,
    `data-checked:` → `data-[state=checked]:`, `data-unchecked:` → `data-[state=unchecked]:`,
    `data-active:`/`data-selected:` → `data-[state=active]:` (or what the Reka part sets),
    `data-pressed:` → `data-[state=on]:` for Toggle, `data-panel-open` → `data-[state=open]`.
  - `data-starting-style`/`data-ending-style` transitions → tw-animate classes
    (`data-[state=open]:animate-in data-[state=open]:fade-in-0 …`), since Reka's Presence waits for animations.
  - `--transform-origin` → `--reka-popper-transform-origin`, `--available-height` →
    `--reka-popper-available-height`, `--anchor-width` → `--reka-popper-anchor-width`.
  - Accordion/Collapsible heights: `data-[state=open]:animate-collapsible-down` etc. with
    `--reka-collapsible-content-height`.
- Behavior: use Reka UI (`reka-ui`) wherever Base UI was used. Check the exported names and types in
  `vue/node_modules/reka-ui/dist/index.d.ts` before using them. Where Reka has no equivalent, write
  plain Vue 3 (`<script setup lang="ts">`, `defineModel`, `provide/inject`, `useId`) or use
  `@vueuse/core`.
- Props: `defineProps<RekaProps & { class?: HTMLAttributes["class"] }>()`, strip `class` into a
  computed `delegated`, forward with `useForwardProps` / `useForwardPropsEmits`, merge classes with
  `cn(..., props.class)`. Root parts that render no element (Root, Portal, Provider) get no `data-slot`
  and pass slot props through (`v-slot="slotProps"` → `<slot v-bind="slotProps" />`).
- Values: React `value`/`onValueChange`, `checked`/`onCheckedChange` → `v-model`
  (`modelValue` + `update:modelValue`). React callbacks → emits. `render` prop → `as` / `as-child`
  (Reka `Primitive`). `children` → default slot; extra ReactNode props → named slots (keep a prop
  too when it is plain text).
- Class strings that contain quotes (`[&_svg:not([class*='size-'])]`) live in `<script>` as
  double-quoted constants, never inline in a template attribute.
- Imports: `@/lib/utils` for `cn`, `@/components/ui/styles` for the shared class strings
  (popupClassName, backdropClassName, menuItemClassName, inputClassName), other components through
  their folder index: `import { Button } from "@/components/ui/button"`. Icons from `@lucide/vue`
  (same names as lucide-react without the `Icon` suffix, e.g. `ChevronDown`).
- Packages available: vue, reka-ui, @vueuse/core, @lucide/vue, class-variance-authority, clsx,
  tailwind-merge, date-fns, @internationalized/date, embla-carousel-vue, embla-carousel-autoplay,
  @unovis/vue + @unovis/ts (charts). Do not install anything or edit `vue/package.json`.
- Only write inside your own component folders and their example files. Do not edit `styles.ts`,
  `utils.ts`, `App.vue`, other components' folders, or anything outside `vue/`.
- Check: `cd vue && npx vue-tsc --noEmit 2>&1 | grep -E "src/(components/ui/(<your slugs>)/|examples/(<your slugs>)\.vue)"`
  must print nothing. Errors in other folders belong to other ports running at the same time: ignore them.

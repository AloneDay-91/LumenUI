# Lumen UI — how to build with it

Paper and pills. Warm ink-on-paper neutrals, flat surfaces, no shadows on cards, pill-shaped controls. Components come from `window.LumenUI` (React, behavior from Base UI). Styling is **Tailwind utility classes over CSS-variable tokens**: every color is a token, never a raw hex.

## Setup

- `styles.css` loads everything: tokens (`:root`), Tailwind utilities, component CSS and the fonts (Inter body, Fraunces serif, JetBrains Mono code). Nothing else to import.
- Light by default. **Dark mode = `class="dark"` on an ancestor** (`<html>` or any wrapper); `class="light"` inside it forces light again.
- Wrap the app in `<div className="root">` (`isolation: isolate`) so portalled popups (Dialog, Menu, Select, Popover, Tooltip, toasts) stack above the page.
- Providers: `TooltipProvider` around tooltips; `SidebarProvider` around `Sidebar` + `SidebarInset` (Sidebar throws without it); `ToastProvider` + `<Toaster />` once at the root, then `useToastManager().add({ title, description })`.
- Charts: `Chart` + `ChartGrid` / `ChartXAxis` / `ChartYAxis` / `ChartTooltip` / `ChartLegend` wrap recharts. Take the series primitives from the same bundle — `const { BarChart, Bar, AreaChart, Area, LineChart, Line, PieChart, Pie, Cell } = window.LumenUI.Recharts` — never a separate recharts copy (the wrappers would render nothing).
- Compound parts are flat exports: `Card` + `CardHeader` / `CardTitle` / `CardDescription` / `CardContent` / `CardFooter`; `Field` + `FieldLabel` / `FieldControl` / `FieldDescription` / `FieldError`; `Tabs` + `TabsList` / `TabsTab` / `TabsIndicator` / `TabsPanels` / `TabsPanel`. Each component's `.prompt.md` has an API table for every part.

## Styling vocabulary (all compiled into styles.css)

| Use | Classes |
|---|---|
| Surfaces | `bg-background` (paper), `bg-card`, `bg-popover`, `bg-muted`, `bg-secondary`, `bg-accent`, `bg-input/50` |
| Text | `text-foreground`, `text-muted-foreground` (secondary copy), `text-primary-foreground` on `bg-primary` |
| Lines | `border-border`, `ring-1 ring-foreground/5` (cards: flat, no shadow), `divide-y divide-border` |
| Status hues | `{indigo,cyan,orange,crimson,jade}-{ink,ink-strong,wash,panel,solid,on-solid,line}` as `bg-*` / `text-*` / `border-*`, e.g. `bg-jade-wash text-jade-ink` |
| Radius | controls `rounded-full`; inputs `rounded-2xl`; cards `rounded-[min(var(--radius-4xl),24px)]` |
| Type | body `text-sm`, controls/labels `text-xs`, headings `text-xl font-medium tracking-tight`; `font-serif`, `font-mono` |
| Layout | `flex`, `grid`, `gap-{1..24}`, `p-*`/`px-*`/`py-*`, `space-y-*`, `max-w-{sm..7xl}`, `grid-cols-{1..12}`, `md:`/`lg:` prefixes |

Rules from the brand (`guidelines/DESIGN.md`): hues are for **status only**, never the primary action; `Button` default is near-black ink. No purple "AI" accents, no blue action color, no 7xl headings. Lists are rows separated by `Separator`.

Prefer component props over classes for component looks: `Button variant="default|secondary|outline|ghost|destructive|link" size="xs|sm|default|lg|icon"`, `Badge variant` or `color="indigo|…" highContrast`, `Alert variant="info|success|warning|destructive"`, `TabsList variant="line" color="…"`. Use classes for your own layout glue.

## Where the truth lives

`styles.css` → `_ds_bundle.css` (every token under `:root` / `.dark`, every utility). Per component: `components/<group>/<Name>/<Name>.prompt.md` (docs + API tables) and `<Name>.d.ts`.

## Example

```tsx
const { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Button, Badge } = window.LumenUI

<div className="root min-h-screen bg-background p-6 text-sm text-foreground">
  <Card className="max-w-md">
    <CardHeader>
      <CardTitle>Deploy preview</CardTitle>
      <CardDescription>Built from main · 2 minutes ago</CardDescription>
    </CardHeader>
    <CardContent className="flex items-center gap-2">
      <Badge color="jade">Ready</Badge>
      <span className="text-muted-foreground">lumen-ui.vercel.app</span>
    </CardContent>
    <CardFooter className="gap-2">
      <Button>Open</Button>
      <Button variant="outline">Logs</Button>
    </CardFooter>
  </Card>
</div>
```

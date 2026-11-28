export const colorTokens = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "destructive",
  "border",
  "ring",
] as const

export type ColorToken = (typeof colorTokens)[number]

export type SansFont = "inter" | "system"
export type HeadingFont = "sans" | "fraunces"
export type MonoFont = "jetbrains" | "system"
export type ShadowPreset = "none" | "soft" | "medium" | "strong" | "medusa"

export type ThemeColors = Record<ColorToken, string>

export type ThemeSystem = "medusa"

export type ThemePreset = {
  light: ThemeColors
  dark: ThemeColors
  radius: number
  fontSize: number
  sans: SansFont
  heading: HeadingFont
  mono: MonoFont
  shadow: ShadowPreset
  /** Pulls in the rest of a design system: surfaces, tags, and button shadows. */
  system?: ThemeSystem
}

/** The Lumen theme: white paper, a blue primary, and a tight radius. */
export const defaultPreset: ThemePreset = {
  light: {
    background: "#ffffff",
    foreground: "#1c1c1c",
    card: "#fafafa",
    "card-foreground": "#1c1c1c",
    primary: "#5877f7",
    "primary-foreground": "#fafafa",
    secondary: "#f5f5f5",
    "secondary-foreground": "#262626",
    muted: "#f5f5f5",
    "muted-foreground": "#696969",
    destructive: "#dc3d43",
    border: "#e5e5e5",
    ring: "#a3a3a3",
  },
  dark: {
    background: "#111111",
    foreground: "#fafafa",
    card: "#171717",
    "card-foreground": "#fafafa",
    primary: "#8aacfc",
    "primary-foreground": "#262626",
    secondary: "#333333",
    "secondary-foreground": "#fafafa",
    muted: "#333333",
    "muted-foreground": "#a3a3a3",
    destructive: "#e5484d",
    border: "#2e2e2e",
    ring: "#737373",
  },
  radius: 0.15,
  fontSize: 16,
  sans: "inter",
  heading: "sans",
  mono: "jetbrains",
  shadow: "soft",
}

/** The first Lumen theme: warm paper, a black primary, and a softer radius. */
export const paperPreset: ThemePreset = {
  light: {
    background: "#fcfbf8",
    foreground: "#1c1c1c",
    card: "#fcfbf8",
    "card-foreground": "#1c1c1c",
    primary: "#262626",
    "primary-foreground": "#fafafa",
    secondary: "#ecebe8",
    "secondary-foreground": "#262626",
    muted: "#f6f5f3",
    "muted-foreground": "#696969",
    destructive: "#c70036",
    border: "#e4e0da",
    ring: "#737373",
  },
  dark: {
    background: "#111111",
    foreground: "#fafafa",
    card: "#171717",
    "card-foreground": "#fafafa",
    primary: "#e8e8e8",
    "primary-foreground": "#262626",
    secondary: "#333333",
    "secondary-foreground": "#fafafa",
    muted: "#333333",
    "muted-foreground": "#a3a3a3",
    destructive: "#ff637e",
    border: "#2e2e2e",
    ring: "#737373",
  },
  radius: 0.625,
  fontSize: 16,
  sans: "inter",
  heading: "sans",
  mono: "jetbrains",
  shadow: "soft",
}

/**
 * Medusa UI, from the official Medusa UI design system (Figma & @medusajs/ui-preset).
 * Page canvas uses `--bg-subtle` (#fafafa / #18181b) while cards float on `--bg-base`
 * (#ffffff / #212124) with multi-layered card elevations. Primary is the inverted dark
 * control (`--button-inverted`), secondary is `--button-neutral`, and interactive blue
 * (`#3b82f6` / `#60a5fa`) is reserved for focus rings, toggles, and active checks.
 * Base radius 0.2rem maps controls (`rounded-2xl`) to ~6px and cards (`rounded-4xl`) to ~8px.
 */
export const medusaPreset: ThemePreset = {
  light: {
    background: "#fafafa",
    foreground: "#18181b",
    card: "#ffffff",
    "card-foreground": "#18181b",
    primary: "#27272a",
    "primary-foreground": "#ffffff",
    secondary: "#ffffff",
    "secondary-foreground": "#18181b",
    muted: "#f4f4f5",
    "muted-foreground": "#52525b",
    destructive: "#e11d48",
    border: "#e4e4e7",
    ring: "#3b82f6",
  },
  dark: {
    background: "#18181b",
    foreground: "#f4f4f5",
    card: "#212124",
    "card-foreground": "#f4f4f5",
    primary: "#52525b",
    "primary-foreground": "#ffffff",
    secondary: "#2c2c30",
    "secondary-foreground": "#f4f4f5",
    muted: "#27272a",
    "muted-foreground": "#a1a1aa",
    destructive: "#e11d48",
    border: "#323236",
    ring: "#60a5fa",
  },
  radius: 0.2,
  fontSize: 16,
  sans: "inter",
  heading: "sans",
  mono: "jetbrains",
  shadow: "medusa",
  system: "medusa",
}

/** The presets Customize offers as starting points. */
export const themePresets = [
  { id: "lumen", name: "Lumen", preset: defaultPreset },
  { id: "paper", name: "Paper", preset: paperPreset },
  { id: "medusa", name: "Medusa", preset: medusaPreset },
] as const

export type ThemePresetId = (typeof themePresets)[number]["id"]

/** True when two presets would write the same stylesheet. */
export function isSamePreset(a: ThemePreset, b: ThemePreset) {
  return (
    colorTokens.every((token) => a.light[token] === b.light[token] && a.dark[token] === b.dark[token]) &&
    a.radius === b.radius &&
    a.fontSize === b.fontSize &&
    a.sans === b.sans &&
    a.heading === b.heading &&
    a.mono === b.mono &&
    a.shadow === b.shadow &&
    a.system === b.system
  )
}

const PRESET_START = "/* lumen-preset:start */"
const PRESET_END = "/* lumen-preset:end */"

function fontSans(id: SansFont) {
  switch (id) {
    case "inter":
      return "var(--font-inter, ui-sans-serif), system-ui, sans-serif"
    case "system":
      return "ui-sans-serif, system-ui, sans-serif"
    default: {
      const unreachable: never = id
      return unreachable
    }
  }
}

function fontHeading(id: HeadingFont, sans: SansFont) {
  switch (id) {
    case "sans":
      return fontSans(sans)
    case "fraunces":
      return "var(--font-fraunces, ui-serif), Georgia, serif"
    default: {
      const unreachable: never = id
      return unreachable
    }
  }
}

function fontMono(id: MonoFont) {
  switch (id) {
    case "jetbrains":
      return "var(--font-jetbrains, ui-monospace), monospace"
    case "system":
      return "ui-monospace, monospace"
    default: {
      const unreachable: never = id
      return unreachable
    }
  }
}

function shadowValue(id: ShadowPreset, step: "sm" | "md" | "lg") {
  const scale = { sm: 1, md: 2, lg: 3 }[step]
  switch (id) {
    case "none":
      return "0 0 #0000"
    case "soft":
      return `0 ${scale}px ${scale * 4}px rgb(0 0 0 / ${0.04 + scale * 0.01})`
    case "medium":
      return `0 ${scale * 2}px ${scale * 8}px rgb(0 0 0 / ${0.08 + scale * 0.02})`
    case "strong":
      return `0 ${scale * 4}px ${scale * 14}px rgb(0 0 0 / ${0.14 + scale * 0.03})`
    case "medusa": {
      if (step === "sm") {
        return "0 1px 2px 0 rgb(0 0 0 / 0.12), 0 0 0 1px rgb(0 0 0 / 0.08)"
      }
      if (step === "md") {
        return "0 0 0 1px rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08), 0 2px 4px 0 rgb(0 0 0 / 0.04)"
      }
      return "0 0 0 1px rgb(0 0 0 / 0.08), 0 4px 8px 0 rgb(0 0 0 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.08)"
    }
    default: {
      const unreachable: never = id
      return unreachable
    }
  }
}

function colorBlock(colors: ThemeColors) {
  return colorTokens.map((token) => `  --${token}: ${colors[token]};`).join("\n")
}

/** Full Medusa UI design tokens (surfaces, tags, borders, and elevations) from the Figma spec. */
function medusaSystem(mode: "light" | "dark") {
  if (mode === "light") {
    return `
  --popover: #ffffff;
  --popover-foreground: #18181b;
  --accent: #f4f4f5;
  --accent-foreground: #18181b;
  --input: #e4e4e7;
  --sidebar: #fafafa;
  --sidebar-foreground: #18181b;
  --sidebar-primary: #27272a;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #f4f4f5;
  --sidebar-accent-foreground: #18181b;
  --sidebar-border: #e4e4e7;
  --sidebar-ring: #3b82f6;
  --shadow-button: inset 0 0.75px 0 0 rgb(255 255 255 / 0.2), 0 1px 2px 0 rgb(0 0 0 / 0.4), 0 0 0 1px #18181b;
  --shadow-button-neutral: 0 1px 2px 0 rgb(0 0 0 / 0.12), 0 0 0 1px rgb(0 0 0 / 0.08);
  --shadow-button-danger: inset 0 0.75px 0 0 rgb(255 255 255 / 0.2), 0 1px 2px 0 rgb(190 18 60 / 0.4), 0 0 0 1px #be123c;
  --medusa-elevation-card-rest: 0 0 0 1px rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08), 0 2px 4px 0 rgb(0 0 0 / 0.04);
  --medusa-elevation-card-hover: 0 0 0 1px rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08), 0 2px 8px 0 rgb(0 0 0 / 0.1);
  --medusa-elevation-flyout: 0 0 0 1px rgb(0 0 0 / 0.08), 0 4px 8px 0 rgb(0 0 0 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.08);
  --medusa-elevation-modal: inset 0 0 0 1px #ffffff, inset 0 0 0 1.5px rgb(228 228 231 / 0.6), 0 0 0 1px rgb(0 0 0 / 0.08), 0 8px 16px 0 rgb(0 0 0 / 0.08), 0 16px 32px 0 rgb(0 0 0 / 0.08);
  --medusa-borders-base: 0 1px 2px 0 rgb(0 0 0 / 0.12), 0 0 0 1px rgb(0 0 0 / 0.08);
  --medusa-borders-interactive: 0 0 0 1px #2563eb, 0 0 0 4px rgb(37 99 235 / 0.2);
  --medusa-borders-interactive-shadow: 0 1px 2px 0 rgb(30 58 138 / 0.5), 0 0 0 1px #2563eb;
  --medusa-borders-error: 0 0 0 1px #e11d48, 0 0 0 3px rgb(225 29 72 / 0.15);
  --medusa-switch-bg: inset 0 1px 1px 0 rgb(0 0 0 / 0.04), inset 0 2px 4px 0 rgb(0 0 0 / 0.04), inset 0 0 0 0.75px rgb(0 0 0 / 0.06), inset 0 0 8px 0 rgb(0 0 0 / 0.02), 0 2px 4px 0 rgb(0 0 0 / 0.04);
  --medusa-switch-handle: inset 0 0 2px 1px #ffffff, inset 0 1px 0 0 #ffffff, 0 0 0 0.5px rgb(0 0 0 / 0.02), 0 5px 4px 0 rgb(0 0 0 / 0.02), 0 3px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px 0 rgb(0 0 0 / 0.12), 0 0 1px 0 rgb(0 0 0 / 0.08);
  --medusa-field-bg: #fafafa;
  --medusa-field-bg-hover: #f4f4f5;
  --medusa-interactive: #3b82f6;
  --medusa-switch-off: #e4e4e7;
  --medusa-button-neutral-hover: #f4f4f5;
  --medusa-button-danger: #e11d48;
  --medusa-button-danger-hover: #be123c;
  --medusa-button-sheen: linear-gradient(180deg, rgb(255 255 255 / 0.12) 0%, rgb(255 255 255 / 0) 100%);
  --gray-panel: #f4f4f5;
  --indigo-ink: #1e40af;
  --indigo-ink-strong: #1e3a8a;
  --indigo-ink-deep: #172554;
  --indigo-wash: #dbeafe;
  --indigo-wash-hover: #bfdbfe;
  --indigo-panel: #eff6ff;
  --indigo-solid: #3b82f6;
  --indigo-on-solid: #ffffff;
  --indigo-line: #bfdbfe;
  --cyan-ink: #5b21b6;
  --cyan-ink-strong: #4c1d95;
  --cyan-ink-deep: #2e1065;
  --cyan-wash: #ede9fe;
  --cyan-wash-hover: #ddd6fe;
  --cyan-panel: #ede9fe;
  --cyan-solid: #7c3aed;
  --cyan-on-solid: #ffffff;
  --cyan-line: #ddd6fe;
  --orange-ink: #9a3412;
  --orange-ink-strong: #7c2d12;
  --orange-ink-deep: #431407;
  --orange-wash: #ffedd5;
  --orange-wash-hover: #fed7aa;
  --orange-panel: #ffedd5;
  --orange-solid: #f97316;
  --orange-on-solid: #ffffff;
  --orange-line: #fed7aa;
  --crimson-ink: #9f1239;
  --crimson-ink-strong: #881337;
  --crimson-ink-deep: #4c0519;
  --crimson-wash: #ffe4e6;
  --crimson-wash-hover: #fecdd3;
  --crimson-panel: #ffe4e6;
  --crimson-solid: #e11d48;
  --crimson-on-solid: #ffffff;
  --crimson-line: #fecdd3;
  --jade-ink: #065f46;
  --jade-ink-strong: #064e3b;
  --jade-ink-deep: #022c22;
  --jade-wash: #d1fae5;
  --jade-wash-hover: #a7f3d0;
  --jade-panel: #d1fae5;
  --jade-solid: #10b981;
  --jade-on-solid: #ffffff;
  --jade-line: #a7f3d0;`
  }

  return `
  --popover: #27272a;
  --popover-foreground: #f4f4f5;
  --accent: #3f3f46;
  --accent-foreground: #f4f4f5;
  --input: rgb(255 255 255 / 0.08);
  --sidebar: #18181b;
  --sidebar-foreground: #f4f4f5;
  --sidebar-primary: #52525b;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #27272a;
  --sidebar-accent-foreground: #f4f4f5;
  --sidebar-border: rgb(255 255 255 / 0.08);
  --sidebar-ring: #60a5fa;
  --shadow-sm: inset 0 1px 0 0 rgb(255 255 255 / 0.06), 0 0 0 1px rgb(255 255 255 / 0.08), 0 1px 2px 0 rgb(0 0 0 / 0.32);
  --shadow-md: inset 0 1px 0 0 rgb(255 255 255 / 0.06), 0 0 0 1px rgb(255 255 255 / 0.08), 0 2px 4px 0 rgb(0 0 0 / 0.36);
  --shadow-lg: inset 0 1px 0 0 rgb(255 255 255 / 0.06), 0 0 0 1px rgb(255 255 255 / 0.1), 0 4px 8px 0 rgb(0 0 0 / 0.32), 0 8px 16px 0 rgb(0 0 0 / 0.32);
  --shadow-button: inset 0 1px 0 0 rgb(255 255 255 / 0.14), 0 0 0 1px rgb(255 255 255 / 0.12), 0 1px 2px 0 rgb(0 0 0 / 0.36);
  --shadow-button-neutral: inset 0 1px 0 0 rgb(255 255 255 / 0.06), 0 0 0 1px rgb(255 255 255 / 0.08), 0 1px 2px 0 rgb(0 0 0 / 0.32);
  --shadow-button-danger: inset 0 1px 0 0 rgb(255 255 255 / 0.18), 0 0 0 1px rgb(255 255 255 / 0.1), 0 1px 2px 0 rgb(0 0 0 / 0.36);
  --medusa-elevation-card-rest: inset 0 1px 0 0 rgb(255 255 255 / 0.05), 0 0 0 1px rgb(255 255 255 / 0.08), 0 1px 2px 0 rgb(0 0 0 / 0.32), 0 2px 4px 0 rgb(0 0 0 / 0.28);
  --medusa-elevation-card-hover: inset 0 1px 0 0 rgb(255 255 255 / 0.06), 0 0 0 1px rgb(255 255 255 / 0.1), 0 1px 4px 0 rgb(0 0 0 / 0.44), 0 2px 8px 0 rgb(0 0 0 / 0.4);
  --medusa-elevation-flyout: inset 0 1px 0 0 rgb(255 255 255 / 0.06), 0 0 0 1px rgb(255 255 255 / 0.1), 0 4px 8px 0 rgb(0 0 0 / 0.32), 0 8px 16px 0 rgb(0 0 0 / 0.32);
  --medusa-elevation-modal: inset 0 1px 0 0 rgb(255 255 255 / 0.08), 0 0 0 1px rgb(255 255 255 / 0.1), 0 8px 16px 0 rgb(0 0 0 / 0.4), 0 16px 32px 0 rgb(0 0 0 / 0.36);
  --medusa-borders-base: inset 0 1px 0 0 rgb(255 255 255 / 0.05), 0 0 0 1px rgb(255 255 255 / 0.08), 0 1px 2px 0 rgb(0 0 0 / 0.28);
  --medusa-borders-interactive: 0 0 0 1px #60a5fa, 0 0 0 4px rgb(59 130 246 / 0.25);
  --medusa-borders-interactive-shadow: 0 -1px 2px 0 rgb(219 234 254 / 0.5), 0 0 0 1px #60a5fa;
  --medusa-borders-error: 0 0 0 1px #f43f5e, 0 0 0 3px rgb(225 29 72 / 0.25);
  --medusa-switch-bg: inset 0 1px 1px 0 rgb(0 0 0 / 0.1), inset 0 2px 4px 0 rgb(0 0 0 / 0.1), inset 0 0 0 0.75px rgb(255 255 255 / 0.12), inset 0 0 8px 0 rgb(0 0 0 / 0.1);
  --medusa-switch-handle: inset 0 0 2px 1px #ffffff, inset 0 1px 0 0 #ffffff, 0 0 0 0.5px rgb(0 0 0 / 0.16), 0 5px 4px 0 rgb(0 0 0 / 0.1), 0 3px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px 0 rgb(0 0 0 / 0.1), 0 0 1px 0 rgb(0 0 0 / 0.1);
  --medusa-field-bg: rgb(255 255 255 / 0.04);
  --medusa-field-bg-hover: rgb(255 255 255 / 0.08);
  --medusa-interactive: #60a5fa;
  --medusa-switch-off: #3f3f46;
  --medusa-button-neutral-hover: rgb(255 255 255 / 0.08);
  --medusa-button-danger: #9f1239;
  --medusa-button-danger-hover: #be123c;
  --medusa-button-sheen: linear-gradient(180deg, rgb(255 255 255 / 0.08) 0%, rgb(255 255 255 / 0) 100%);
  --gray-panel: #27272a;
  --indigo-ink: #93c5fd;
  --indigo-ink-strong: #bfdbfe;
  --indigo-ink-deep: #dbeafe;
  --indigo-wash: #172554;
  --indigo-wash-hover: #1e3a8a;
  --indigo-panel: #172554;
  --indigo-solid: #60a5fa;
  --indigo-on-solid: #172554;
  --indigo-line: #1e3a8a;
  --cyan-ink: #c4b5fd;
  --cyan-ink-strong: #ddd6fe;
  --cyan-ink-deep: #ede9fe;
  --cyan-wash: #2e1065;
  --cyan-wash-hover: #5b21b6;
  --cyan-panel: #2e1065;
  --cyan-solid: #a78bfa;
  --cyan-on-solid: #2e1065;
  --cyan-line: #5b21b6;
  --orange-ink: #fdba74;
  --orange-ink-strong: #fed7aa;
  --orange-ink-deep: #ffedd5;
  --orange-wash: #431407;
  --orange-wash-hover: #7c2d12;
  --orange-panel: #431407;
  --orange-solid: #fb923c;
  --orange-on-solid: #431407;
  --orange-line: #7c2d12;
  --crimson-ink: #fda4af;
  --crimson-ink-strong: #fecdd3;
  --crimson-ink-deep: #ffe4e6;
  --crimson-wash: #4c0519;
  --crimson-wash-hover: #881337;
  --crimson-panel: #4c0519;
  --crimson-solid: #fb7185;
  --crimson-on-solid: #4c0519;
  --crimson-line: #881337;
  --jade-ink: #34d399;
  --jade-ink-strong: #6ee7b7;
  --jade-ink-deep: #a7f3d0;
  --jade-wash: #022c22;
  --jade-wash-hover: #064e3b;
  --jade-panel: #022c22;
  --jade-solid: #10b981;
  --jade-on-solid: #022c22;
  --jade-line: #064e3b;`
}

/**
 * Component surface, border, and elevation rules for the Medusa UI design system.
 * Uses CSS variables scoped to `:root, .light` and `.dark` so switching Light/Dark
 * inside `/customize` stays isolated from the host page theme.
 */
function medusaSystemRules() {
  return `
[data-slot="card"][data-variant="default"] {
  border-width: 0;
  box-shadow: var(--medusa-elevation-card-rest);
}

[data-slot="button"].bg-primary,
[data-slot="button"].bg-secondary,
[data-slot="button"].border-border,
[data-slot="button"][class*="bg-destructive"] {
  border-width: 0;
  background-clip: border-box;
}

[data-slot="button"].bg-primary {
  background-image: var(--medusa-button-sheen);
}

[data-slot="button"].bg-primary:hover:not(:disabled) {
  background-color: color-mix(in oklab, var(--primary), white 12%);
}

[data-slot="button"].bg-secondary:hover:not(:disabled) {
  background-color: var(--medusa-button-neutral-hover);
}

[data-slot="button"].border-border {
  background-color: var(--secondary);
  box-shadow: var(--shadow-button-neutral);
}

[data-slot="button"].border-border:hover:not(:disabled) {
  background-color: var(--medusa-button-neutral-hover);
}

[data-slot="button"][class*="bg-destructive"] {
  background-color: var(--medusa-button-danger);
  background-image: var(--medusa-button-sheen);
  color: #ffffff;
}

[data-slot="button"][class*="bg-destructive"]:hover:not(:disabled) {
  background-color: var(--medusa-button-danger-hover);
}

[data-slot="input"]:not([data-slot="input-group"] *),
[data-slot="input-group"],
[data-slot="textarea"],
[data-slot="select-trigger"] {
  background-color: var(--medusa-field-bg);
  border-width: 0;
  box-shadow: var(--medusa-borders-base);
}

[data-slot="input"]:not([data-slot="input-group"] *):hover:not(:disabled),
[data-slot="input-group"]:hover:not(:has(:disabled)),
[data-slot="textarea"]:hover:not(:disabled),
[data-slot="select-trigger"]:hover:not(:disabled) {
  background-color: var(--medusa-field-bg-hover);
}

[data-slot="input"]:not([data-slot="input-group"] *):focus-visible,
[data-slot="input-group"]:focus-within,
[data-slot="textarea"]:focus-visible,
[data-slot="select-trigger"]:focus-visible {
  box-shadow: var(--medusa-borders-interactive);
}

[data-slot="input"]:not([data-slot="input-group"] *)[aria-invalid="true"],
[data-slot="input-group"]:has([aria-invalid="true"]),
[data-slot="textarea"][aria-invalid="true"],
[data-slot="select-trigger"][aria-invalid="true"] {
  box-shadow: var(--medusa-borders-error);
}

[data-slot="switch"] {
  background-color: var(--medusa-switch-off);
  box-shadow: var(--medusa-switch-bg);
}

[data-slot="switch"][data-checked] {
  background-color: var(--medusa-interactive);
}

[data-slot="switch-thumb"] {
  background-color: #ffffff;
  box-shadow: var(--medusa-switch-handle);
}

[data-slot="checkbox"],
[data-slot="radio-group-item"] {
  background-color: var(--card);
  border-width: 0;
  box-shadow: var(--medusa-borders-base);
}

[data-slot="checkbox"][data-checked],
[data-slot="radio-group-item"][data-checked] {
  background-color: var(--medusa-interactive);
  color: #ffffff;
  box-shadow: var(--medusa-borders-interactive-shadow);
}

[data-slot="tabs-indicator"],
[data-slot="toggle-group"] [data-slot="toggle"][data-pressed] {
  background-color: var(--card);
  box-shadow: var(--shadow-button-neutral);
}

[data-slot="badge"][data-variant="secondary"] {
  background-color: var(--muted);
  border-color: var(--border);
}

[data-slot="badge"][data-color="indigo"]:not([data-high-contrast]) {
  border-color: var(--indigo-line);
}

[data-slot="badge"][data-color="cyan"]:not([data-high-contrast]) {
  border-color: var(--cyan-line);
}

[data-slot="badge"][data-color="orange"]:not([data-high-contrast]) {
  border-color: var(--orange-line);
}

[data-slot="badge"][data-color="crimson"]:not([data-high-contrast]) {
  border-color: var(--crimson-line);
}

[data-slot="badge"][data-color="jade"]:not([data-high-contrast]) {
  border-color: var(--jade-line);
}

[data-slot="dialog-content"],
[data-slot="alert-dialog-content"] {
  box-shadow: var(--medusa-elevation-modal);
}

[data-slot="dropdown-menu-content"],
[data-slot="select-content"],
[data-slot="popover-content"] {
  box-shadow: var(--medusa-elevation-flyout);
}

[data-slot="kbd"] {
  background-color: var(--medusa-field-bg);
  border: 1px solid var(--border);
  box-shadow: 0 1px 0 0 var(--border);
}
`
}

function radiusBlock(radius: number) {
  const value = `${radius}rem`
  return [
    `  --radius: ${value};`,
    "  --radius-sm: calc(var(--radius) * 0.6);",
    "  --radius-md: calc(var(--radius) * 0.8);",
    "  --radius-lg: var(--radius);",
    "  --radius-xl: calc(var(--radius) * 1.4);",
    "  --radius-2xl: calc(var(--radius) * 1.8);",
    "  --radius-3xl: calc(var(--radius) * 2.2);",
    "  --radius-4xl: calc(var(--radius) * 2.6);",
  ].join("\n")
}

export function buildPresetCss(preset: ThemePreset) {
  const sans = fontSans(preset.sans)
  const heading = fontHeading(preset.heading, preset.sans)
  const mono = fontMono(preset.mono)
  const lightSystem = preset.system === "medusa" ? medusaSystem("light") : ""
  const darkSystem = preset.system === "medusa" ? medusaSystem("dark") : ""
  const systemRules = preset.system === "medusa" ? medusaSystemRules() : ""

  return `${PRESET_START}
@theme inline {
  --font-sans: ${sans};
  --font-heading: ${heading};
  --font-mono: ${mono};
  --shadow-sm: ${shadowValue(preset.shadow, "sm")};
  --shadow-md: ${shadowValue(preset.shadow, "md")};
  --shadow-lg: ${shadowValue(preset.shadow, "lg")};
}

:root,
.light {
${colorBlock(preset.light)}
${radiusBlock(preset.radius)}
  --font-sans: ${sans};
  --font-heading: ${heading};
  --font-mono: ${mono};
  --shadow-sm: ${shadowValue(preset.shadow, "sm")};
  --shadow-md: ${shadowValue(preset.shadow, "md")};
  --shadow-lg: ${shadowValue(preset.shadow, "lg")};${lightSystem}
}

.dark {
${colorBlock(preset.dark)}${darkSystem}
}

html {
  font-size: ${preset.fontSize}px;
}${systemRules}
${PRESET_END}
`
}

export const PRESET_COMMAND = "npx @aloneday/lumenui@latest preset lumen-preset.css"

const SAFE_COLOR = /^[#a-zA-Z0-9.,%()\s/+-]+$/

function isSafeColor(value: unknown): value is string {
  return typeof value === "string" && value.length > 0 && value.length <= 80 && SAFE_COLOR.test(value) && !value.includes("--")
}

function isPalette(value: unknown): value is ThemeColors {
  if (!value || typeof value !== "object") return false
  const record = value as Record<string, unknown>
  return colorTokens.every((token) => isSafeColor(record[token]))
}

export function encodePreset(preset: ThemePreset) {
  const bytes = new TextEncoder().encode(JSON.stringify(preset))
  let binary = ""
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "")
}

export function decodePreset(value: string): ThemePreset | undefined {
  try {
    const padded = value.replaceAll("-", "+").replaceAll("_", "/")
    const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4))
    const binary = atob(`${padded}${pad}`)
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
    return sanitizePreset(JSON.parse(new TextDecoder().decode(bytes)))
  } catch {
    return undefined
  }
}

function sanitizePreset(value: unknown): ThemePreset | undefined {
  if (!value || typeof value !== "object") return undefined
  const record = value as Record<string, unknown>
  if (!isPalette(record.light) || !isPalette(record.dark)) return undefined
  if (typeof record.radius !== "number" || record.radius < 0 || record.radius > 1.5) return undefined
  if (typeof record.fontSize !== "number" || record.fontSize < 14 || record.fontSize > 20) return undefined
  if (record.sans !== "inter" && record.sans !== "system") return undefined
  if (record.heading !== "sans" && record.heading !== "fraunces") return undefined
  if (record.mono !== "jetbrains" && record.mono !== "system") return undefined
  if (
    record.shadow !== "none" &&
    record.shadow !== "soft" &&
    record.shadow !== "medium" &&
    record.shadow !== "strong" &&
    record.shadow !== "medusa"
  ) {
    return undefined
  }

  const light = {} as ThemeColors
  const dark = {} as ThemeColors
  for (const token of colorTokens) {
    light[token] = (record.light as ThemeColors)[token]
    dark[token] = (record.dark as ThemeColors)[token]
  }

  return {
    light,
    dark,
    radius: record.radius,
    fontSize: record.fontSize,
    sans: record.sans,
    heading: record.heading,
    mono: record.mono,
    shadow: record.shadow,
    ...(record.system === "medusa" ? { system: "medusa" as const } : {}),
  }
}

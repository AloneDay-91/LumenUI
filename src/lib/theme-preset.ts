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
export type ShadowPreset = "none" | "soft" | "medium" | "strong"

export type ThemeColors = Record<ColorToken, string>

export type ThemePreset = {
  light: ThemeColors
  dark: ThemeColors
  radius: number
  fontSize: number
  sans: SansFont
  heading: HeadingFont
  mono: MonoFont
  shadow: ShadowPreset
}

export const defaultPreset: ThemePreset = {
  light: {
    background: "#fcfbf8",
    foreground: "#1c1c1c",
    card: "#fcfbf8",
    "card-foreground": "#1c1c1c",
    primary: "#262626",
    "primary-foreground": "#fafafa",
    secondary: "#f5f5f5",
    "secondary-foreground": "#262626",
    muted: "#f5f5f5",
    "muted-foreground": "#696969",
    destructive: "#dc3d43",
    border: "#e4e0da",
    ring: "#a3a3a3",
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
    destructive: "#e5484d",
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
    default: {
      const unreachable: never = id
      return unreachable
    }
  }
}

function colorBlock(colors: ThemeColors) {
  return colorTokens.map((token) => `  --${token}: ${colors[token]};`).join("\n")
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
  --shadow-lg: ${shadowValue(preset.shadow, "lg")};
}

.dark {
${colorBlock(preset.dark)}
}

html {
  font-size: ${preset.fontSize}px;
}
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
    record.shadow !== "strong"
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
  }
}

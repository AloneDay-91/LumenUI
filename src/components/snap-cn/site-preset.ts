import { defaultPreset, type ThemePreset } from "@/lib/theme-preset"

/**
 * The site's own theme (the preset block at the end of globals.css), so the
 * Customize page in the video opens on the Lumen design system rather than on
 * the neutral default.
 */
export const LUMEN_SITE_PRESET: ThemePreset = {
  ...defaultPreset,
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
  sans: "inter",
  heading: "sans",
  mono: "jetbrains",
}

/** Copy-paste tokens for a consumer `globals.css`. Keep in sync with `src/app/globals.css`. */
export const LUMEN_GLOBAL_CSS = `@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --font-sans: var(--font-inter, Inter), ui-sans-serif, system-ui, sans-serif;
  --font-heading: var(--font-sans);
  --font-serif: var(--font-fraunces, Fraunces), ui-serif, Georgia, serif;
  --font-mono: var(--font-jetbrains, "JetBrains Mono"), ui-monospace, monospace;

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-new: var(--new);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --color-gray-panel: var(--gray-panel);
  --color-indigo-ink: var(--indigo-ink);
  --color-indigo-ink-strong: var(--indigo-ink-strong);
  --color-indigo-ink-deep: var(--indigo-ink-deep);
  --color-indigo-wash: var(--indigo-wash);
  --color-indigo-wash-hover: var(--indigo-wash-hover);
  --color-indigo-panel: var(--indigo-panel);
  --color-indigo-solid: var(--indigo-solid);
  --color-indigo-on-solid: var(--indigo-on-solid);
  --color-indigo-line: var(--indigo-line);
  --color-cyan-ink: var(--cyan-ink);
  --color-cyan-ink-strong: var(--cyan-ink-strong);
  --color-cyan-ink-deep: var(--cyan-ink-deep);
  --color-cyan-wash: var(--cyan-wash);
  --color-cyan-wash-hover: var(--cyan-wash-hover);
  --color-cyan-panel: var(--cyan-panel);
  --color-cyan-solid: var(--cyan-solid);
  --color-cyan-on-solid: var(--cyan-on-solid);
  --color-cyan-line: var(--cyan-line);
  --color-orange-ink: var(--orange-ink);
  --color-orange-ink-strong: var(--orange-ink-strong);
  --color-orange-ink-deep: var(--orange-ink-deep);
  --color-orange-wash: var(--orange-wash);
  --color-orange-wash-hover: var(--orange-wash-hover);
  --color-orange-panel: var(--orange-panel);
  --color-orange-solid: var(--orange-solid);
  --color-orange-on-solid: var(--orange-on-solid);
  --color-orange-line: var(--orange-line);
  --color-crimson-ink: var(--crimson-ink);
  --color-crimson-ink-strong: var(--crimson-ink-strong);
  --color-crimson-ink-deep: var(--crimson-ink-deep);
  --color-crimson-wash: var(--crimson-wash);
  --color-crimson-wash-hover: var(--crimson-wash-hover);
  --color-crimson-panel: var(--crimson-panel);
  --color-crimson-solid: var(--crimson-solid);
  --color-crimson-on-solid: var(--crimson-on-solid);
  --color-crimson-line: var(--crimson-line);
  --color-jade-ink: var(--jade-ink);
  --color-jade-ink-strong: var(--jade-ink-strong);
  --color-jade-ink-deep: var(--jade-ink-deep);
  --color-jade-wash: var(--jade-wash);
  --color-jade-wash-hover: var(--jade-wash-hover);
  --color-jade-panel: var(--jade-panel);
  --color-jade-solid: var(--jade-solid);
  --color-jade-on-solid: var(--jade-on-solid);
  --color-jade-line: var(--jade-line);

  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

:root {
  --background: oklch(0.99 0.003 90);
  --foreground: oklch(0.145 0 0);
  --card: oklch(0.99 0.003 90);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(0.99 0.003 90);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.52 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --new: oklch(0.7 0.13 75);
  --border: oklch(0.88 0.004 90);
  --input: oklch(0.88 0.004 90);
  --ring: oklch(0.708 0 0);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);

  /* Hues for Badge, Callout, Tabs, and Data List. ink is the type, wash the soft badge, panel the callout, solid the filled badge. */
  --gray-panel: oklch(92.8% 0.006 264.531);
  --indigo-ink: oklch(45.7% 0.24 277.023);
  --indigo-ink-strong: oklch(39.8% 0.195 277.366);
  --indigo-ink-deep: oklch(25.7% 0.09 281.288);
  --indigo-wash: oklch(51.1% 0.262 276.966 / 0.1);
  --indigo-wash-hover: oklch(51.1% 0.262 276.966 / 0.2);
  --indigo-panel: oklch(87% 0.065 274.039);
  --indigo-solid: oklch(45.7% 0.24 277.023);
  --indigo-on-solid: #fff;
  --indigo-line: oklch(39.8% 0.195 277.366 / 0.4);
  --cyan-ink: oklch(52% 0.105 223.128);
  --cyan-ink-strong: oklch(45% 0.085 224.283);
  --cyan-ink-deep: oklch(30.2% 0.056 229.695);
  --cyan-wash: oklch(60.9% 0.126 221.723 / 0.1);
  --cyan-wash-hover: oklch(60.9% 0.126 221.723 / 0.2);
  --cyan-panel: oklch(91.7% 0.08 205.041);
  --cyan-solid: oklch(52% 0.105 223.128);
  --cyan-on-solid: #fff;
  --cyan-line: oklch(45% 0.085 224.283 / 0.45);
  --orange-ink: oklch(55.3% 0.195 38.402);
  --orange-ink-strong: oklch(47% 0.157 37.304);
  --orange-ink-deep: oklch(26.6% 0.079 36.259);
  --orange-wash: oklch(64.6% 0.222 41.116 / 0.1);
  --orange-wash-hover: oklch(64.6% 0.222 41.116 / 0.2);
  --orange-panel: oklch(90.1% 0.076 70.697);
  --orange-solid: oklch(55.3% 0.195 38.402);
  --orange-on-solid: #fff;
  --orange-line: oklch(47% 0.157 37.304 / 0.4);
  --crimson-ink: oklch(51.4% 0.222 16.935);
  --crimson-ink-strong: oklch(45.5% 0.188 13.697);
  --crimson-ink-deep: oklch(27.1% 0.105 12.094);
  --crimson-wash: oklch(58.6% 0.253 17.585 / 0.1);
  --crimson-wash-hover: oklch(58.6% 0.253 17.585 / 0.2);
  --crimson-panel: oklch(89.2% 0.058 10.001);
  --crimson-solid: oklch(51.4% 0.222 16.935);
  --crimson-on-solid: #fff;
  --crimson-line: oklch(45.5% 0.188 13.697 / 0.4);
  --jade-ink: oklch(50.8% 0.118 165.612);
  --jade-ink-strong: oklch(43.2% 0.095 166.913);
  --jade-ink-deep: oklch(26.2% 0.051 172.552);
  --jade-wash: oklch(59.6% 0.145 163.225 / 0.1);
  --jade-wash-hover: oklch(59.6% 0.145 163.225 / 0.2);
  --jade-panel: oklch(90.5% 0.093 164.15);
  --jade-solid: oklch(50.8% 0.118 165.612);
  --jade-on-solid: #fff;
  --jade-line: oklch(43.2% 0.095 166.913 / 0.45);
}

.dark {
  --background: #111;
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --new: oklch(0.8 0.11 75);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.922 0 0);
  --sidebar-primary-foreground: oklch(0.205 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);

  --gray-panel: oklch(26.9% 0 0);
  --indigo-ink: oklch(67.3% 0.182 276.935);
  --indigo-ink-strong: oklch(78.5% 0.115 274.713);
  --indigo-ink-deep: oklch(87% 0.065 274.039);
  --indigo-wash: oklch(67.3% 0.182 276.935 / 0.2);
  --indigo-wash-hover: oklch(67.3% 0.182 276.935 / 0.3);
  --indigo-panel: oklch(32% 0.09 277);
  --indigo-solid: oklch(67.3% 0.182 276.935);
  --indigo-on-solid: oklch(25.7% 0.09 281.288);
  --indigo-line: oklch(67.3% 0.182 276.935 / 0.55);
  --cyan-ink: oklch(78.9% 0.154 211.53);
  --cyan-ink-strong: oklch(86.5% 0.127 207.078);
  --cyan-ink-deep: oklch(91.7% 0.08 205.041);
  --cyan-wash: oklch(78.9% 0.154 211.53 / 0.2);
  --cyan-wash-hover: oklch(78.9% 0.154 211.53 / 0.3);
  --cyan-panel: oklch(32% 0.06 215);
  --cyan-solid: oklch(78.9% 0.154 211.53);
  --cyan-on-solid: oklch(30.2% 0.056 229.695);
  --cyan-line: oklch(78.9% 0.154 211.53 / 0.55);
  --orange-ink: oklch(75% 0.183 55.934);
  --orange-ink-strong: oklch(83.7% 0.128 66.29);
  --orange-ink-deep: oklch(90.1% 0.076 70.697);
  --orange-wash: oklch(75% 0.183 55.934 / 0.2);
  --orange-wash-hover: oklch(75% 0.183 55.934 / 0.3);
  --orange-panel: oklch(34% 0.08 50);
  --orange-solid: oklch(75% 0.183 55.934);
  --orange-on-solid: oklch(26.6% 0.079 36.259);
  --orange-line: oklch(75% 0.183 55.934 / 0.55);
  --crimson-ink: oklch(71.2% 0.194 13.428);
  --crimson-ink-strong: oklch(81% 0.117 11.638);
  --crimson-ink-deep: oklch(89.2% 0.058 10.001);
  --crimson-wash: oklch(71.2% 0.194 13.428 / 0.2);
  --crimson-wash-hover: oklch(71.2% 0.194 13.428 / 0.3);
  --crimson-panel: oklch(32% 0.09 15);
  --crimson-solid: oklch(71.2% 0.194 13.428);
  --crimson-on-solid: oklch(27.1% 0.105 12.094);
  --crimson-line: oklch(71.2% 0.194 13.428 / 0.55);
  --jade-ink: oklch(76.5% 0.177 163.223);
  --jade-ink-strong: oklch(84.5% 0.143 164.978);
  --jade-ink-deep: oklch(90.5% 0.093 164.15);
  --jade-wash: oklch(76.5% 0.177 163.223 / 0.2);
  --jade-wash-hover: oklch(76.5% 0.177 163.223 / 0.3);
  --jade-panel: oklch(32% 0.06 165);
  --jade-solid: oklch(76.5% 0.177 163.223);
  --jade-on-solid: oklch(26.2% 0.051 172.552);
  --jade-line: oklch(76.5% 0.177 163.223 / 0.55);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  html {
    @apply font-sans scroll-smooth;
  }

  body {
    @apply bg-background text-sm text-foreground;
  }

  .root {
    isolation: isolate;
  }

  button:not(:disabled),
  [role="button"]:not(:disabled),
  [role="checkbox"]:not([aria-disabled="true"]),
  [role="radio"]:not([aria-disabled="true"]),
  [role="switch"]:not([aria-disabled="true"]),
  [role="menuitem"]:not([aria-disabled="true"]),
  [role="menuitemcheckbox"]:not([aria-disabled="true"]),
  [role="menuitemradio"]:not([aria-disabled="true"]),
  [role="option"]:not([aria-disabled="true"]),
  [role="tab"]:not([aria-disabled="true"]),
  input[type="range"]:not(:disabled) {
    cursor: pointer;
  }
}
`

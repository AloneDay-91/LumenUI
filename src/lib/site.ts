import packageJson from "../../package.json"

export const SITE_NAME = "Lumen UI"
export const SITE_VERSION = packageJson.version
export const SITE_URL = "https://ui.elouanb.fr"
export const GITHUB_REPO = "AloneDay-91/LumenUI"
export const GITHUB_URL = "https://github.com/AloneDay-91/LumenUI"
/** The branch the published docs are built from. */
export const GITHUB_BRANCH = "main"
export const LANDING_MAX_WIDTH = "max-w-6xl"

export function formatDocsVersion(version = SITE_VERSION) {
  return `v${version}`
}

const range = (version: string) => version.replace(/^\D+/, "")
const major = (version: string) => range(version).split(".")[0]
const majorMinor = (version: string) =>
  range(version).split(".").slice(0, 2).join(".")

/** Derived from package.json so the hero strip cannot drift. */
export const STACK = [
  {
    id: "base-ui" as const,
    label: `Base UI ${majorMinor(packageJson.dependencies["@base-ui/react"])}`,
  },
  {
    id: "tailwind" as const,
    label: `Tailwind CSS ${major(packageJson.devDependencies.tailwindcss)}`,
  },
  {
    id: "react" as const,
    label: `React ${major(packageJson.dependencies.react)}`,
  },
]

/** React 19 apps the copied components render in. The files do not import Next.js. */
export const FRAMEWORKS = [
  {
    id: "next" as const,
    href: "/docs/frameworks/nextjs",
    name: "Next.js",
    body: "App Router and Pages. The copied files are client components.",
  },
  {
    id: "vite" as const,
    href: "/docs/frameworks/vite",
    name: "Vite",
    body: "A React app with Tailwind. No framework import in the source.",
  },
  {
    id: "react-router" as const,
    href: "/docs/frameworks/react-router",
    name: "React Router",
    body: "Framework mode and Remix. Same React tree, same files.",
  },
  {
    id: "astro" as const,
    href: "/docs/frameworks/astro",
    name: "Astro",
    body: "React islands. The component runs on the client; the page around it stays static.",
  },
  {
    id: "tanstack" as const,
    href: "/docs/frameworks/tanstack-start",
    name: "TanStack Start",
    body: "A React Start app. Client components render the same file.",
  },
]

/** Vue stacks with a guide. `mark` picks the logo in FrameworkMark. */
export const VUE_FRAMEWORKS = [
  {
    id: "vue-vite" as const,
    mark: "vite" as const,
    name: "Vite + Vue",
    href: "/docs/frameworks/vue-vite",
    body: "create-vue or the Vite template. init writes into the sheet main.ts imports.",
  },
  {
    id: "nuxt" as const,
    mark: "nuxt" as const,
    name: "Nuxt",
    href: "/docs/frameworks/nuxt",
    body: "Nuxt 4 with SSR. Tailwind through its Vite plugin, components imported.",
  },
  {
    id: "laravel" as const,
    mark: "laravel" as const,
    name: "Laravel + Inertia",
    href: "/docs/frameworks/laravel",
    body: "The Vue starter kit. Lumen sits next to its shadcn-vue components.",
  },
  {
    id: "astro-vue" as const,
    mark: "astro" as const,
    name: "Astro + Vue",
    href: "/docs/frameworks/astro-vue",
    body: "Vue islands. Compose a dialog and its trigger in one .vue file.",
  },
]

export const COMPAT = [
  {
    id: "react" as const,
    name: "React",
    version: major(packageJson.dependencies.react),
    body: "Function components. They render in any React tree.",
  },
  {
    id: "tailwind" as const,
    name: "Tailwind CSS",
    version: major(packageJson.devDependencies.tailwindcss),
    body: "Styles are utilities, so they follow your Tailwind setup.",
  },
  {
    id: "base-ui" as const,
    name: "Base UI",
    version: majorMinor(packageJson.dependencies["@base-ui/react"]),
    body: "Focus, keyboard, and portals come from the primitives.",
  },
]

/** Hero backdrop image served from public/ so the hero does not depend on a third-party CDN. */
export const HERO_BACKGROUND = "/images/hero.jpg"

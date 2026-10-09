import packageJson from "../../package.json"

export const SITE_NAME = "Lumen UI"
export const SITE_VERSION = packageJson.version
export const SITE_URL = "https://ui.elouanb.fr"
export const GITHUB_REPO = "AloneDay-91/LumenUI"
export const GITHUB_URL = "https://github.com/AloneDay-91/LumenUI"
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
    name: "Next.js",
    body: "App Router and Pages. The copied files are client components.",
  },
  {
    id: "vite" as const,
    name: "Vite",
    body: "A React app with Tailwind. No framework import in the source.",
  },
  {
    id: "react-router" as const,
    name: "React Router",
    body: "Framework mode and Remix. Same React tree, same files.",
  },
  {
    id: "astro" as const,
    name: "Astro",
    body: "React islands. The component runs on the client; the page around it stays static.",
  },
  {
    id: "tanstack" as const,
    name: "TanStack Start",
    body: "A React Start app. Client components render the same file.",
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

export const HERO_BACKGROUND =
  "https://images.unsplash.com/photo-1775313088881-649b8d9dc7d8?q=80&w=1600&auto=format&fit=crop"

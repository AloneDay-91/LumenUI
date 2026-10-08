import packageJson from "../../package.json"

export const SITE_NAME = "Lumen UI"
export const SITE_VERSION = packageJson.version
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
  `Base UI ${majorMinor(packageJson.dependencies["@base-ui/react"])}`,
  `Tailwind CSS ${major(packageJson.devDependencies.tailwindcss)}`,
  `React ${major(packageJson.dependencies.react)}`,
  `Next.js ${major(packageJson.dependencies.next)}`,
  "TypeScript",
]

export const HERO_BACKGROUND =
  "https://images.unsplash.com/photo-1775313088881-649b8d9dc7d8?q=80&w=1600&auto=format&fit=crop"

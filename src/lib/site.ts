import packageJson from "../../package.json"

export const SITE_NAME = "Lumen UI"
export const SITE_VERSION = packageJson.version
export const GITHUB_URL = "https://github.com/AloneDay-91"
export const LANDING_MAX_WIDTH = "max-w-6xl"

export function formatDocsVersion(version = SITE_VERSION) {
  return `v${version}`
}

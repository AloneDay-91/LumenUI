import { changelog, type ChangelogRelease } from "@/lib/changelog"
import { GITHUB_URL, SITE_URL } from "@/lib/site"

/* ---------------------------------------------------------------------------
   Since / Updated badges, read from the changelog.
   --------------------------------------------------------------------------- */

function hrefsOf(item: ChangelogRelease["items"][number]) {
  return [item.href, ...(item.links ?? []).map((link) => link.href)]
    .filter((href): href is string => Boolean(href))
    // "/docs/components/button#loading" counts for the Button page.
    .map((href) => href.split("#")[0])
}

type PageVersions = { added?: string; updated?: string }

/** For each docs page: the release that added it, and the last one that changed it. */
const pageVersions: Map<string, PageVersions> = (() => {
  const map = new Map<string, PageVersions>()
  // Oldest first, so the first mention wins for "added" and the last for "updated".
  for (const release of [...changelog].reverse()) {
    for (const item of release.items) {
      for (const href of hrefsOf(item)) {
        const seen = map.get(href)
        if (!seen) {
          // First mention. Only an "added" item dates the page; a fix or a
          // change means the page is older than the changelog's links.
          map.set(href, item.kind === "added" ? { added: release.version } : { updated: release.version })
        } else if (seen.added !== release.version) {
          seen.updated = release.version
        }
      }
    }
  }
  return map
})()

/** "1.2" from "1.2.0": badges name the minor, patches are noise. */
export function minorOf(version: string) {
  return version.split(".").slice(0, 2).join(".")
}

export function getPageVersions(href: string): PageVersions {
  const entry = pageVersions.get(href) ?? {}
  // An update in the same minor as the addition says nothing new.
  if (entry.added && entry.updated && minorOf(entry.added) === minorOf(entry.updated)) {
    return { added: entry.added }
  }
  return entry
}

/* ---------------------------------------------------------------------------
   Version switcher: the latest docs here, older minors elsewhere.
   --------------------------------------------------------------------------- */

/**
 * Where each older minor's docs live, as "1.1=https://…,1.0=https://…".
 * compose.yaml passes it to the latest build; each archive is its release
 * tag in its own container. A minor without a URL opens its tag on GitHub.
 */
const ARCHIVE_URLS: Record<string, string> = Object.fromEntries(
  (process.env.NEXT_PUBLIC_DOCS_ARCHIVES ?? "")
    .split(",")
    .map((entry) => entry.trim().split("="))
    .filter((pair): pair is [string, string] => pair.length === 2 && Boolean(pair[0] && pair[1]))
    .map(([minor, url]) => [minor.trim(), url.trim()]),
)

export type DocsVersion = {
  /** "1.2" */
  minor: string
  /** The last release of that minor, "1.2.0". */
  version: string
  latest: boolean
  url: string
  /** False while the version only links to its tag on GitHub. */
  archived: boolean
}

/** One entry per minor, newest first, each at its last patch release. */
export const docsVersions: DocsVersion[] = (() => {
  const seen = new Set<string>()
  const versions: DocsVersion[] = []
  for (const release of changelog) {
    const minor = minorOf(release.version)
    if (seen.has(minor)) continue
    seen.add(minor)
    const latest = versions.length === 0
    const archive = ARCHIVE_URLS[minor]
    versions.push({
      minor,
      version: release.version,
      latest,
      url: latest ? SITE_URL : (archive ?? `${GITHUB_URL}/tree/v${release.version}`),
      archived: latest || Boolean(archive),
    })
  }
  return versions
})()

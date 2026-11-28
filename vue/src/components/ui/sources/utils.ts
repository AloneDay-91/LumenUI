export type Source = { href: string; title: string }

export function hostOf(href: string) {
  try {
    return new URL(href).hostname.replace(/^www\./, "")
  } catch {
    return href
  }
}

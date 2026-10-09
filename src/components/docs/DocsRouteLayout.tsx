import type { ReactNode } from "react"

/** Passes the page through. Route layouts use it to carry their own metadata. */
export default function DocsRouteLayout({ children }: { children: ReactNode }) {
  return children
}

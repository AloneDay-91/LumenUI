"use client"

import { useSyncExternalStore } from "react"

export type DocsFramework = "react" | "vue"

const KEY = "lumen-docs-framework"
export const DOCS_FRAMEWORK_EVENT = "lumen-docs-framework"

function read(): DocsFramework {
  try {
    return window.localStorage.getItem(KEY) === "vue" ? "vue" : "react"
  } catch {
    return "react"
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(DOCS_FRAMEWORK_EVENT, onChange)
  window.addEventListener("storage", onChange)
  return () => {
    window.removeEventListener(DOCS_FRAMEWORK_EVENT, onChange)
    window.removeEventListener("storage", onChange)
  }
}

/** The framework the reader picked on a component page. Shared by every page and kept across visits. */
export function useFramework() {
  const framework = useSyncExternalStore(subscribe, read, () => "react" as const)
  const setFramework = (next: DocsFramework) => {
    try {
      window.localStorage.setItem(KEY, next)
    } catch {
      // Private mode: the choice lasts for this page only.
    }
    window.dispatchEvent(new Event(DOCS_FRAMEWORK_EVENT))
  }
  return [framework, setFramework] as const
}

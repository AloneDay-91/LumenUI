"use client"

import { useCallback, useEffect, useState } from "react"

/** Copies text and reports success for `resetMs`. Resolves false on failure. */
export function useCopy(resetMs = 2000) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timeout = window.setTimeout(() => setCopied(false), resetMs)
    return () => window.clearTimeout(timeout)
  }, [copied, resetMs])

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      return true
    } catch {
      setCopied(false)
      return false
    }
  }, [])

  return { copied, copy }
}

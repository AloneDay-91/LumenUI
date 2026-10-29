"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react"
import { useTheme } from "next-themes"

import {
  buildPresetCss,
  decodePreset,
  defaultPreset,
  type ColorToken,
  type ThemePreset,
} from "@/lib/theme-preset"

const STORAGE_KEY = "lumen-theme-draft"

type ThemeDraftValue = {
  preset: ThemePreset
  setPreset: Dispatch<SetStateAction<ThemePreset>>
  palette: "light" | "dark"
  setPalette: (palette: "light" | "dark") => void
  updateColor: (token: ColorToken, value: string) => void
  reset: () => void
  css: string
}

const ThemeDraftContext = createContext<ThemeDraftValue | null>(null)

function loadPreset(): ThemePreset {
  try {
    const shared = new URLSearchParams(window.location.search).get("preset")
    if (shared) {
      const parsed = decodePreset(shared)
      if (parsed) return parsed
    }
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return defaultPreset
    return { ...defaultPreset, ...JSON.parse(stored) }
  } catch {
    return defaultPreset
  }
}

function subscribeToNothing() {
  return () => {}
}

export function ThemeDraftProvider({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme()
  // The stored draft only exists in the browser: render the default preset on the server.
  const ready = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false
  )
  const stored = useMemo(() => (ready ? loadPreset() : defaultPreset), [ready])
  const [draft, setDraft] = useState<ThemePreset | null>(null)
  const preset = draft ?? stored
  // The palette follows the site theme until someone picks one.
  const [pickedPalette, setPalette] = useState<"light" | "dark" | null>(null)
  const palette = pickedPalette ?? (resolvedTheme === "dark" ? "dark" : "light")
  const css = buildPresetCss(preset)

  const setPreset: Dispatch<SetStateAction<ThemePreset>> = useCallback(
    (action) =>
      setDraft((current) =>
        typeof action === "function" ? action(current ?? loadPreset()) : action
      ),
    []
  )

  useEffect(() => {
    if (!ready) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preset))
    const style = document.querySelector("[data-lumen-preset]") ?? document.createElement("style")
    style.setAttribute("data-lumen-preset", "")
    style.textContent = css
      .replace("/* lumen-preset:start */", "")
      .replace("/* lumen-preset:end */", "")
    document.head.appendChild(style)
    return () => style.remove()
  }, [css, preset, ready])

  function updateColor(token: ColorToken, value: string) {
    setPreset((current) => ({
      ...current,
      [palette]: { ...current[palette], [token]: value },
    }))
  }

  function reset() {
    setDraft(defaultPreset)
    window.localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <ThemeDraftContext.Provider
      value={{ preset, setPreset, palette, setPalette, updateColor, reset, css }}
    >
      {children}
    </ThemeDraftContext.Provider>
  )
}

export function useThemeDraft() {
  const value = useContext(ThemeDraftContext)
  if (!value) throw new Error("useThemeDraft must be used inside ThemeDraftProvider")
  return value
}

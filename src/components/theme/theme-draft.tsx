"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react"

import {
  buildPresetCss,
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
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return defaultPreset
    return { ...defaultPreset, ...JSON.parse(stored) }
  } catch {
    return defaultPreset
  }
}

export function ThemeDraftProvider({ children }: { children: ReactNode }) {
  const [preset, setPreset] = useState<ThemePreset>(defaultPreset)
  const [palette, setPalette] = useState<"light" | "dark">("light")
  const [ready, setReady] = useState(false)
  const css = buildPresetCss(preset)

  useEffect(() => {
    setPreset(loadPreset())
    setReady(true)
  }, [])

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
  }, [css, ready])

  function updateColor(token: ColorToken, value: string) {
    setPreset((current) => ({
      ...current,
      [palette]: { ...current[palette], [token]: value },
    }))
  }

  function reset() {
    setPreset(defaultPreset)
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

"use client"

import type { ReactNode } from "react"
import { Check, Copy, Download, Link2, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { ColorPicker } from "@/components/ui/ColorPicker"
import { CopyButton } from "@/components/ui/CopyButton"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { Slider } from "@/components/ui/Slider"
import { Toggle } from "@/components/ui/Toggle"
import { ToggleGroup } from "@/components/ui/ToggleGroup"
import { useThemeDraft } from "@/components/theme/theme-draft"
import {
  PRESET_COMMAND,
  encodePreset,
  isSamePreset,
  themePresets,
  type ColorToken,
  type HeadingFont,
  type MonoFont,
  type ShadowPreset,
} from "@/lib/theme-preset"
import { useCopy } from "@/lib/use-copy"
import { cn } from "@/lib/utils"

const colorLabels: Record<ColorToken, string> = {
  background: "Background",
  foreground: "Foreground",
  card: "Card",
  "card-foreground": "Card text",
  primary: "Primary",
  "primary-foreground": "Primary text",
  secondary: "Secondary",
  "secondary-foreground": "Secondary text",
  muted: "Muted",
  "muted-foreground": "Muted text",
  destructive: "Destructive",
  border: "Border",
  ring: "Ring",
}

const colorGroups: { title: string; tokens: ColorToken[] }[] = [
  { title: "Surfaces", tokens: ["background", "foreground", "card", "card-foreground"] },
  { title: "Actions", tokens: ["primary", "primary-foreground", "secondary", "secondary-foreground"] },
  { title: "States", tokens: ["muted", "muted-foreground", "destructive"] },
  { title: "Lines", tokens: ["border", "ring"] },
]

const shadowOptions: [ShadowPreset, string][] = [
  ["none", "None"],
  ["soft", "Soft"],
  ["medium", "Medium"],
  ["strong", "Strong"],
]

function Section({
  title,
  action,
  children,
}: {
  title: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="flex flex-col gap-3 py-5 first:pt-0">
      <div className="flex min-h-7 items-center justify-between gap-3">
        <h2 className="text-xs font-medium text-foreground">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}

/** The controls of the Customize page. Pass `withExport={false}` to render the export elsewhere. */
export function ThemeControls({
  onNavigate,
  withExport = true,
}: {
  onNavigate?: () => void
  withExport?: boolean
}) {
  const { preset, setPreset, palette, setPalette, updateColor, reset } = useThemeDraft()

  return (
    <div className="flex flex-col divide-y divide-border">
      <Section
        title="Preset"
        action={
          <Button type="button" size="xs" variant="ghost" onClick={reset}>
            <RotateCcw />
            Reset
          </Button>
        }
      >
        <div className="grid grid-cols-2 gap-2">
          {themePresets.map((item) => {
            const active = isSamePreset(preset, item.preset)
            const colors = item.preset[palette]
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => setPreset(item.preset)}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg border p-2.5 text-left text-xs font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/30",
                  active
                    ? "border-foreground/40 bg-muted text-foreground"
                    : "border-border text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <span
                  aria-hidden
                  className="flex shrink-0 overflow-hidden border border-border"
                  style={{ borderRadius: `${item.preset.radius}rem` }}
                >
                  {(["background", "primary", "muted"] as const).map((token) => (
                    <span key={token} className="size-4" style={{ background: colors[token] }} />
                  ))}
                </span>
                {item.name}
              </button>
            )
          })}
        </div>
      </Section>

      <Section
        title="Color"
        action={
          <ToggleGroup
            aria-label="Palette"
            value={[palette]}
            onValueChange={(next) => {
              const mode = next[0]
              if (mode === "light" || mode === "dark") setPalette(mode)
            }}
          >
            <Toggle value="light">Light</Toggle>
            <Toggle value="dark">Dark</Toggle>
          </ToggleGroup>
        }
      >
        <div className="flex flex-col gap-4">
          {colorGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-1">
              <p className="text-[11px] text-muted-foreground">{group.title}</p>
              <ul className="flex flex-col">
                {group.tokens.map((token) => (
                  <li key={token} className="flex h-9 items-center gap-2.5">
                    <ColorPicker
                      value={preset[palette][token]}
                      aria-label={colorLabels[token]}
                      onValueChange={(next) => updateColor(token, next)}
                      className="size-6"
                    />
                    <Label className="min-w-0 flex-1 truncate text-xs font-normal">
                      {colorLabels[token]}
                    </Label>
                    <Input
                      value={preset[palette][token]}
                      aria-label={`${colorLabels[token]} value`}
                      spellCheck={false}
                      className="h-7 w-24 px-2 font-mono text-[11px]"
                      onChange={(event) => updateColor(token, event.target.value)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Type">
        <div className="flex flex-col gap-2">
          <Choice
            id="sans"
            label="Sans"
            value={preset.sans}
            options={[
              ["inter", "Inter"],
              ["system", "System"],
            ]}
            onChange={(value) => {
              if (value === "inter" || value === "system") {
                setPreset((current) => ({ ...current, sans: value }))
              }
            }}
          />
          <Choice
            id="heading"
            label="Heading"
            value={preset.heading}
            options={[
              ["sans", "Same as sans"],
              ["fraunces", "Fraunces"],
            ]}
            onChange={(value) => {
              if (value === "sans" || value === "fraunces") {
                setPreset((current) => ({ ...current, heading: value satisfies HeadingFont }))
              }
            }}
          />
          <Choice
            id="mono"
            label="Mono"
            value={preset.mono}
            options={[
              ["jetbrains", "JetBrains Mono"],
              ["system", "System mono"],
            ]}
            onChange={(value) => {
              if (value === "jetbrains" || value === "system") {
                setPreset((current) => ({ ...current, mono: value satisfies MonoFont }))
              }
            }}
          />
        </div>
        <Range
          label="Font size"
          display={`${preset.fontSize}px`}
          min={14}
          max={20}
          step={1}
          value={preset.fontSize}
          onChange={(fontSize) => setPreset((current) => ({ ...current, fontSize }))}
        />
      </Section>

      <Section title="Shape">
        <Range
          label="Radius"
          display={`${preset.radius.toFixed(3)}rem`}
          min={0}
          max={1.5}
          step={0.025}
          value={preset.radius}
          onChange={(radius) => setPreset((current) => ({ ...current, radius }))}
        />
        <div className="flex flex-col gap-2">
          <Label className="text-xs font-normal text-muted-foreground">Shadow</Label>
          <ToggleGroup
            aria-label="Shadow"
            value={[preset.shadow]}
            onValueChange={(next) => {
              const shadow = shadowOptions.find(([option]) => option === next[0])?.[0]
              if (shadow) setPreset((current) => ({ ...current, shadow }))
            }}
            className="grid w-full grid-cols-4"
          >
            {shadowOptions.map(([option, text]) => (
              <Toggle key={option} value={option}>
                {text}
              </Toggle>
            ))}
          </ToggleGroup>
        </div>
      </Section>

      {withExport ? (
        <Section title="Export">
          <ThemeExport onNavigate={onNavigate} />
        </Section>
      ) : null}
    </div>
  )
}

/** Copy, share, or download the preset, with the CLI command that applies it. */
export function ThemeExport({ onNavigate }: { onNavigate?: () => void }) {
  const { preset, css } = useThemeDraft()
  const { copied, copy } = useCopy()
  const { copied: linkCopied, copy: copyLink } = useCopy()

  function share() {
    const url = new URL(window.location.href)
    url.searchParams.set("preset", encodePreset(preset))
    window.history.replaceState(null, "", `${url.pathname}${url.search}`)
    void copyLink(url.toString())
    onNavigate?.()
  }

  function download() {
    const blob = new Blob([css], { type: "text/css" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "lumen-preset.css"
    link.click()
    URL.revokeObjectURL(url)
    onNavigate?.()
  }

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/50 py-1 ps-2.5 pe-1">
        <code className="min-w-0 flex-1 truncate font-mono text-[11px] text-muted-foreground">
          {PRESET_COMMAND}
        </code>
        <CopyButton value={PRESET_COMMAND} size="icon-xs" aria-label="Copy the command" />
      </div>
      <div className="flex gap-1.5">
        <Button type="button" size="sm" className="flex-1" onClick={() => copy(css)}>
          {copied ? <Check /> : <Copy />}
          {copied ? "Copied" : "Copy CSS"}
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={share}>
          {linkCopied ? <Check /> : <Link2 />}
          {linkCopied ? "Copied" : "Link"}
        </Button>
        <Button
          type="button"
          size="icon-sm"
          variant="outline"
          aria-label="Download lumen-preset.css"
          onClick={download}
        >
          <Download />
        </Button>
      </div>
    </div>
  )
}

function Choice({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string
  label: string
  value: string
  options: [string, string][]
  onChange: (value: string) => void
}) {
  return (
    <div className="grid grid-cols-[4.5rem_1fr] items-center gap-2">
      <Label htmlFor={id} className="text-xs font-normal text-muted-foreground">
        {label}
      </Label>
      <Select
        items={options.map(([option, text]) => ({ value: option, label: text }))}
        value={value}
        onValueChange={(next) => next && onChange(next)}
      >
        <SelectTrigger id={id} size="sm" className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map(([option, text]) => (
            <SelectItem key={option} value={option}>
              {text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function Range({
  label,
  display,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string
  display: string
  min: number
  max: number
  step: number
  value: number
  onChange: (value: number) => void
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between gap-2 text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono text-[11px] tabular-nums text-foreground">{display}</span>
      </div>
      <Slider
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={(next) => onChange(Array.isArray(next) ? next[0] : next)}
      />
    </div>
  )
}

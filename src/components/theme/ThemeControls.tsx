"use client"

import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { ColorPicker } from "@/components/ui/ColorPicker"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { useThemeDraft } from "@/components/theme/theme-draft"
import {
  PRESET_COMMAND,
  colorTokens,
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

export function ThemeControls({ onNavigate }: { onNavigate?: () => void }) {
  const { preset, setPreset, palette, setPalette, updateColor, reset, css } = useThemeDraft()
  const { copied, copy } = useCopy()

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
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-medium">Color</h2>
          <div className="flex gap-0.5 rounded-full bg-muted p-0.5">
            {(["light", "dark"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setPalette(mode)}
                className={cn(
                  "h-7 rounded-full px-3 text-xs font-medium capitalize",
                  palette === mode
                    ? "bg-background text-foreground ring-1 ring-foreground/5"
                    : "text-muted-foreground",
                )}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
        <ul className="grid grid-cols-1 gap-3">
          {colorTokens.map((token) => (
            <li key={token} className="flex items-center gap-2">
              <ColorPicker
                value={preset[palette][token]}
                aria-label={colorLabels[token]}
                onValueChange={(next) => updateColor(token, next)}
              />
              <Label className="min-w-0 flex-1 truncate">{colorLabels[token]}</Label>
              <Input
                value={preset[palette][token]}
                aria-label={`${colorLabels[token]} value`}
                className="w-24 font-mono"
                onChange={(event) => updateColor(token, event.target.value)}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium">Type</h2>
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
        <Range
          id="font-size"
          label={`Font size · ${preset.fontSize}px`}
          min={14}
          max={20}
          step={1}
          value={preset.fontSize}
          onChange={(fontSize) => setPreset((current) => ({ ...current, fontSize }))}
        />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium">Shape</h2>
        <Range
          id="radius"
          label={`Radius · ${preset.radius.toFixed(3)}rem`}
          min={0}
          max={1.5}
          step={0.025}
          value={preset.radius}
          onChange={(radius) => setPreset((current) => ({ ...current, radius }))}
        />
        <Choice
          id="shadow"
          label="Shadow"
          value={preset.shadow}
          options={[
            ["none", "None"],
            ["soft", "Soft"],
            ["medium", "Medium"],
            ["strong", "Strong"],
          ]}
          onChange={(value) => {
            if (value === "none" || value === "soft" || value === "medium" || value === "strong") {
              setPreset((current) => ({ ...current, shadow: value satisfies ShadowPreset }))
            }
          }}
        />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-medium">Export</h2>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Download the preset, then add it from your project.
        </p>
        <p className="rounded-2xl bg-muted px-3 py-2 font-mono text-xs break-all">{PRESET_COMMAND}</p>
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" onClick={() => copy(css)}>
            {copied ? "Copied" : "Copy CSS"}
          </Button>
          <Button type="button" size="sm" variant="outline" onClick={download}>
            Download
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={reset}>
            Reset
          </Button>
        </div>
        <Badge variant="outline" className="w-fit">
          lumen-preset.css
        </Badge>
      </section>
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
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={(next) => next && onChange(next)}>
        <SelectTrigger id={id} className="w-full">
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
  id,
  label,
  min,
  max,
  step,
  value,
  onChange,
}: {
  id: string
  label: string
  min: number
  max: number
  step: number
  value: number
  onChange: (value: number) => void
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        className="w-full accent-foreground"
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  )
}

import { ColorPicker, Label } from "lumen-ui"

export const Default = () => <ColorPicker defaultValue="#262626" aria-label="Primary" />

export const Palette = () => (
  <div className="flex flex-col gap-3">
    {[
      { label: "Primary", hex: "#262626" },
      { label: "Accent", hex: "#4f46e5" },
      { label: "Success", hex: "#16a34a" },
      { label: "Warning", hex: "#ea580c" },
    ].map(({ label, hex }) => (
      <div key={label} className="flex items-center gap-3">
        <ColorPicker defaultValue={hex} aria-label={label} />
        <Label>{label}</Label>
        <span className="font-mono text-xs text-muted-foreground">{hex}</span>
      </div>
    ))}
  </div>
)

export const Disabled = () => <ColorPicker defaultValue="#4f46e5" aria-label="Locked brand color" disabled />

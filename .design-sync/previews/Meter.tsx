import { Meter } from "lumen-ui"

export const Default = () => <Meter className="w-56" value={64} max={100} aria-label="Storage used" />

export const Values = () => (
  <div className="flex w-64 flex-col gap-4">
    {[
      { label: "Storage", value: 18 },
      { label: "Bandwidth", value: 64 },
      { label: "Build minutes", value: 92 },
    ].map((row) => (
      <div key={row.label} className="flex flex-col gap-1.5">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{row.label}</span>
          <span className="tabular-nums">{row.value}%</span>
        </div>
        <Meter value={row.value} max={100} aria-label={row.label} />
      </div>
    ))}
  </div>
)

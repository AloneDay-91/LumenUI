import { Label, Slider } from "lumen-ui"

export const Default = () => <Slider className="w-56" defaultValue={40} aria-label="Volume" />

export const WithLabel = () => (
  <div className="grid w-56 gap-2">
    <div className="flex items-center justify-between">
      <Label>Opacity</Label>
      <span className="text-xs text-muted-foreground tabular-nums">72%</span>
    </div>
    <Slider defaultValue={72} aria-label="Opacity" />
  </div>
)

export const Values = () => (
  <div className="flex w-56 flex-col gap-4">
    <Slider defaultValue={10} aria-label="Low" />
    <Slider defaultValue={50} aria-label="Medium" />
    <Slider defaultValue={90} aria-label="High" />
  </div>
)

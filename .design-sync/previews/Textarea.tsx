import { Label, Textarea } from "lumen-ui"

export const Default = () => (
  <div className="grid w-full max-w-sm gap-2">
    <Label htmlFor="message">Message</Label>
    <Textarea id="message" placeholder="Write here…" />
  </div>
)

export const Filled = () => (
  <div className="grid w-full max-w-sm gap-2">
    <Label htmlFor="notes">Release notes</Label>
    <Textarea
      id="notes"
      defaultValue="Sidebar now opens on hover and collapses smoothly. Alert and Badge share the same hues."
    />
    <p className="text-xs text-muted-foreground">Shown on the changelog page.</p>
  </div>
)

export const States = () => (
  <div className="grid w-full max-w-sm gap-3">
    <Textarea aria-invalid defaultValue="Too short" />
    <Textarea disabled placeholder="Comments are closed" />
  </div>
)

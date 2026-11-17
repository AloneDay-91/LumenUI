import { Rating } from "lumen-ui"

export const Default = () => <Rating defaultValue={4} label="Docs quality" />

export const ReadOnly = () => (
  <div className="flex flex-col gap-3">
    <div className="flex items-center gap-3">
      <Rating defaultValue={3} readOnly label="Average score" />
      <span className="text-sm text-muted-foreground">3.0 · 128 reviews</span>
    </div>
    <div className="flex items-center gap-3">
      <Rating defaultValue={5} readOnly label="Top score" />
      <span className="text-sm text-muted-foreground">5.0 · 42 reviews</span>
    </div>
  </div>
)

import { Badge } from "lumen-ui"

export const Default = () => (
  <div className="flex flex-wrap items-center gap-2">
    <Badge>v0.2</Badge>
    <Badge variant="secondary">Beta</Badge>
    <Badge variant="outline">Docs</Badge>
  </div>
)

export const Variants = () => (
  <div className="flex flex-wrap items-center gap-2">
    <Badge>default</Badge>
    <Badge variant="secondary">secondary</Badge>
    <Badge variant="outline">outline</Badge>
    <Badge variant="destructive">destructive</Badge>
    <Badge variant="success">success</Badge>
    <Badge variant="warning">warning</Badge>
  </div>
)

const colors = ["gray", "indigo", "cyan", "orange", "crimson", "jade"] as const
const label = (c: string) => c[0].toUpperCase() + c.slice(1)

export const Color = () => (
  <div className="flex flex-col gap-3">
    <div className="flex flex-wrap gap-2">
      {colors.map((c) => (
        <Badge key={c} color={c}>
          {label(c)}
        </Badge>
      ))}
    </div>
    <div className="flex flex-wrap gap-2">
      {colors.map((c) => (
        <Badge key={c} color={c} highContrast>
          {label(c)}
        </Badge>
      ))}
    </div>
  </div>
)

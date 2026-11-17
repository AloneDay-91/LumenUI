import { Separator } from "lumen-ui"

export const Horizontal = () => (
  <div className="w-56">
    <p className="text-sm">Lumen UI</p>
    <Separator className="my-3" />
    <p className="text-sm text-muted-foreground">Copy-paste</p>
  </div>
)

export const Vertical = () => (
  <div className="flex h-5 items-center gap-3 text-sm">
    <span>Docs</span>
    <Separator orientation="vertical" />
    <span>Components</span>
    <Separator orientation="vertical" />
    <span>Changelog</span>
  </div>
)

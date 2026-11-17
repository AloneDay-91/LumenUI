import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"
import { Toggle } from "lumen-ui"

export const Default = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Toggle>Bold</Toggle>
    <Toggle defaultPressed>Italic</Toggle>
    <Toggle disabled>Underline</Toggle>
  </div>
)

export const WithIcon = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Toggle aria-label="Bold" defaultPressed>
      <BoldIcon />
    </Toggle>
    <Toggle aria-label="Italic">
      <ItalicIcon />
    </Toggle>
    <Toggle aria-label="Underline">
      <UnderlineIcon />
    </Toggle>
    <Toggle defaultPressed>
      <BoldIcon />
      Bold
    </Toggle>
  </div>
)

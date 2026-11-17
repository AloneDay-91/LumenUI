import { CopyIcon, SearchIcon } from "lucide-react"
import { Button, Kbd, Tooltip, TooltipContent, TooltipTrigger } from "lumen-ui"

export const Open = () => (
  <div className="flex items-center justify-center" style={{ minHeight: 240 }}>
    <Tooltip defaultOpen>
      <TooltipTrigger render={<Button variant="outline" />}>
        <SearchIcon data-icon="inline-start" />
        Search
      </TooltipTrigger>
      <TooltipContent>Shortcut ⌘K</TooltipContent>
    </Tooltip>
  </div>
)

export const Toolbar = () => (
  <div className="flex items-center justify-center" style={{ minHeight: 240, gap: 160 }}>
    <Tooltip defaultOpen>
      <TooltipTrigger render={<Button size="icon" variant="outline" aria-label="Copy" />}>
        <CopyIcon />
      </TooltipTrigger>
      <TooltipContent>Copy to clipboard</TooltipContent>
    </Tooltip>
    <Tooltip defaultOpen>
      <TooltipTrigger render={<Button variant="secondary" />}>Publish</TooltipTrigger>
      <TooltipContent>
        Ships the draft <Kbd size="sm">⌘↵</Kbd>
      </TooltipContent>
    </Tooltip>
  </div>
)

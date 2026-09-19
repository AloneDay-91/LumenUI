"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Button } from "@/components/ui/Button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/Tooltip"

export default function TooltipPage() {
  return (
    <ComponentDocs
      name="Tooltip"
      description="Hint on hover or focus. Built on @base-ui/react/tooltip."
      preview={
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            Info
          </TooltipTrigger>
          <TooltipContent>Shortcut ⌘K</TooltipContent>
        </Tooltip>
      }
      usage={`import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/Tooltip"

<Tooltip>
  <TooltipTrigger render={<Button />}>Info</TooltipTrigger>
  <TooltipContent>Shortcut ⌘K</TooltipContent>
</Tooltip>`}
    />
  )
}

"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Button } from "@/components/ui/Button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/Popover"

export default function PopoverPage() {
  return (
    <ComponentDocs
      name="Popover"
      description="Popup anchored to a button. Built on @base-ui/react/popover."
      preview={
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>
            Details
          </PopoverTrigger>
          <PopoverContent>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>
              Width, height, and radius from Lumen tokens.
            </PopoverDescription>
          </PopoverContent>
        </Popover>
      }
      usage={`import { Popover, PopoverTrigger, PopoverContent, PopoverTitle } from "@/components/ui/Popover"

<Popover>
  <PopoverTrigger render={<Button />}>Open</PopoverTrigger>
  <PopoverContent>
    <PopoverTitle>Title</PopoverTitle>
  </PopoverContent>
</Popover>`}
    />
  )
}

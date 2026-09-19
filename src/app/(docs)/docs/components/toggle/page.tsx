"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Toggle } from "@/components/ui/Toggle"

export default function TogglePage() {
  return (
    <ComponentDocs
      name="Toggle"
      description="Two-state button. Built on @base-ui/react/toggle."
      preview={<Toggle>Bold</Toggle>}
      usage={`import { Toggle } from "@/components/ui/Toggle"

<Toggle>Bold</Toggle>`}
    />
  )
}

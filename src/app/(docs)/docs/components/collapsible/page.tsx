"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Button } from "@/components/ui/Button"
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/components/ui/Collapsible"

export default function CollapsiblePage() {
  return (
    <ComponentDocs
      name="Collapsible"
      description="Panel controlled by a button. Built on @base-ui/react/collapsible."
      preview={
        <Collapsible className="w-full max-w-md">
          <CollapsibleTrigger render={<Button variant="outline" />}>
            Show details
          </CollapsibleTrigger>
          <CollapsiblePanel className="pt-3">
            Tokens, CVA, Base UI. The code lives in your repo.
          </CollapsiblePanel>
        </Collapsible>
      }
      usage={`import { Collapsible, CollapsibleTrigger, CollapsiblePanel } from "@/components/ui/Collapsible"

<Collapsible>
  <CollapsibleTrigger render={<Button />}>Open</CollapsibleTrigger>
  <CollapsiblePanel>Content</CollapsiblePanel>
</Collapsible>`}
    />
  )
}

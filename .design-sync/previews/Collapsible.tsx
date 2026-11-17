import { ChevronDownIcon } from "lucide-react"
import { Button, Collapsible, CollapsiblePanel, CollapsibleTrigger } from "lumen-ui"

export const Open = () => (
  <Collapsible className="w-full max-w-md" defaultOpen>
    <CollapsibleTrigger
      className="[&[data-panel-open]>svg]:rotate-180"
      render={<Button variant="outline" />}
    >
      Release notes
      <ChevronDownIcon data-icon="inline-end" />
    </CollapsibleTrigger>
    <CollapsiblePanel className="pt-3 text-sm text-muted-foreground">
      Tokens, CVA, Base UI. The code lives in your repo.
    </CollapsiblePanel>
  </Collapsible>
)

export const Closed = () => (
  <Collapsible className="w-full max-w-md">
    <CollapsibleTrigger
      className="[&[data-panel-open]>svg]:rotate-180"
      render={<Button variant="outline" />}
    >
      Show details
      <ChevronDownIcon data-icon="inline-end" />
    </CollapsibleTrigger>
    <CollapsiblePanel className="pt-3 text-sm text-muted-foreground">
      Tokens, CVA, Base UI. The code lives in your repo.
    </CollapsiblePanel>
  </Collapsible>
)

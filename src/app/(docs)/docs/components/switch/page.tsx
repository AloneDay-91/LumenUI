"use client"

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Label } from "@/components/ui/Label"
import { Switch } from "@/components/ui/Switch"

export default function SwitchPage() {
  return (
    <ComponentDocs
      name="Switch"
      description="Contrôle on/off. Construit sur @base-ui/react/switch."
      preview={
        <Label className="gap-2">
          <Switch defaultChecked />
          Mode sombre
        </Label>
      }
      usage={`import { Switch } from "@/components/ui/Switch"

<Switch defaultChecked />`}
    />
  )
}

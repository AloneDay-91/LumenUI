import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"

export default function LabelPage() {
  return (
    <ComponentDocs
      name="Label"
      description="Field label. Place it above the control, never inside."
      preview={
        <div className="grid w-full max-w-sm gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Elouan Bruzek" />
        </div>
      }
      usage={`import { Label } from "@/components/ui/Label"
import { Input } from "@/components/ui/Input"

<Label htmlFor="name">Name</Label>
<Input id="name" />`}
    />
  )
}

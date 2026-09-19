import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"

export default function InputPage() {
  return (
    <ComponentDocs
      name="Input"
      description="Base UI input. Pill outline, quiet focus ring, invalid state via aria-invalid."
      preview={
        <div className="grid w-full max-w-sm gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@studio.com" />
        </div>
      }
      usage={`import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"

<Label htmlFor="email">Email</Label>
<Input id="email" type="email" placeholder="you@studio.com" />`}
    />
  )
}

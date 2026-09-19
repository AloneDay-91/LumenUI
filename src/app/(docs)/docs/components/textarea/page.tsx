import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Label } from "@/components/ui/Label"
import { Textarea } from "@/components/ui/Textarea"

export default function TextareaPage() {
  return (
    <ComponentDocs
      name="Textarea"
      description="Multiline text area. Same tokens as Input, slightly more open corners."
      preview={
        <div className="grid w-full max-w-sm gap-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" placeholder="Write here…" />
        </div>
      }
      usage={`import { Textarea } from "@/components/ui/Textarea"

<Textarea placeholder="Write here…" />`}
    />
  )
}

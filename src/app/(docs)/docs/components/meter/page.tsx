import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Meter } from "@/components/ui/Meter"

export default function MeterPage() {
  return (
    <ComponentDocs
      name="Meter"
      description="Display of a value within a range. Built on @base-ui/react/meter."
      preview={<Meter className="w-56" value={64} max={100} />}
      usage={`import { Meter } from "@/components/ui/Meter"

<Meter value={64} max={100} />`}
    />
  )
}

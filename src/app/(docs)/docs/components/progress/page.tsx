import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { Progress } from "@/components/ui/Progress"

export default function ProgressPage() {
  return (
    <ComponentDocs
      name="Progress"
      description="Statut d’une tâche longue. Construit sur @base-ui/react/progress."
      preview={<Progress className="w-56" value={42} />}
      usage={`import { Progress } from "@/components/ui/Progress"

<Progress value={42} />`}
    />
  )
}

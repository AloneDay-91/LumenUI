import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { CheckpointDemo } from "@/components/docs/AiExamples"

export default function CheckpointPage() {
  return (
    <ComponentDocs
      name="Checkpoint"
      description="A point in the conversation you can return to: a rule across the thread with a label and a Restore button."
      preview={<CheckpointDemo />}
      usage={`import { Checkpoint } from "@/components/ui/Checkpoint"

<Checkpoint label="Before renaming" onRestore={() => restore(checkpoint.id)} />`}
    />
  )
}

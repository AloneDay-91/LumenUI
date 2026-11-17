import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { QueueDemo } from "@/components/docs/AiExamples"

export default function QueuePage() {
  return (
    <ComponentDocs
      name="Queue"
      description="The agent's todo list, split into what is left and what is done. Done items fold below, struck through."
      preview={<QueueDemo />}
      usage={`import { Queue } from "@/components/ui/Queue"

<Queue
  items={[
    { id: "1", title: "Rename Chat Message", status: "done" },
    { id: "2", title: "Write the Plan pattern", status: "running" },
    { id: "3", title: "Add the overview page", status: "pending" },
  ]}
/>`}
    />
  )
}

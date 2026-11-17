import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { PlanDemo } from "@/components/docs/AiExamples"

export default function PlanPage() {
  return (
    <ComponentDocs
      name="Plan"
      description="The steps the agent plans to take, and how far it has got: a card with a progress bar and the steps on a rail."
      preview={<PlanDemo />}
      usage={`import { Plan } from "@/components/ui/Plan"

<Plan
  title="Date filter"
  steps={[
    { id: "1", title: "Add a range mode", status: "done" },
    { id: "2", title: "Wire it to Data Table", status: "running" },
    { id: "3", title: "Write the docs", status: "pending" },
  ]}
/>`}
      extraHeadings={[
        { id: "status", text: "Status", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="status">Status</h2>
            <p>
              The card takes its status from the steps: running while one runs, failed if one fails, done when all are. The progress bar is a <code>progressbar</code> with the done count.
            </p>
          </section>
        </>
      }
    />
  )
}

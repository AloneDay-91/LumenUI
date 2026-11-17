import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { ChainOfThoughtDemo } from "@/components/docs/AiExamples"

export default function ChainOfThoughtPage() {
  return (
    <ComponentDocs
      name="Chain of Thought"
      description="A one-line summary that expands into the steps the agent took. The summary shimmers while a step runs."
      preview={<ChainOfThoughtDemo />}
      usage={`import { ChainOfThought, ChainOfThoughtStep } from "@/components/ui/ChainOfThought"

<ChainOfThought summary="Looked into date filters in 3 steps">
  <ChainOfThoughtStep title="Read the Date Picker docs" description="It has a range mode." />
  <ChainOfThoughtStep title="Checked Filter Bar" />
  <ChainOfThoughtStep status="running" title="Composing the two" />
</ChainOfThought>`}
      extraHeadings={[
        { id: "vs-reasoning", text: "Next to Reasoning", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="vs-reasoning">Next to Reasoning</h2>
            <p>
              Reasoning is the model's own words. Chain of Thought is what it did: searched, read, compared. Use both in one turn when the agent thinks, then acts.
            </p>
          </section>
        </>
      }
    />
  )
}

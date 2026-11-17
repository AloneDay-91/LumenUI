import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { TraceDemo } from "@/components/docs/AiExamples"

export default function TracePage() {
  return (
    <ComponentDocs
      name="Trace"
      description="The shape every agent step shares: an icon, a label, a status, and a body that folds. Reasoning, Tool, Plan, Task, Queue, Chain of Thought and Subagent are built on it."
      preview={<TraceDemo />}
      usage={`import {
  Trace,
  TraceContent,
  TraceStep,
  TraceSteps,
  TraceTrigger,
} from "@/components/ui/Trace"

<Trace status="running" defaultOpen>
  <TraceTrigger icon={<SearchIcon />} label="Searching the docs" meta="0.8s" />
  <TraceContent>
    <TraceSteps>
      <TraceStep title="Read the Split Button page" />
      <TraceStep status="running" title="Writing the answer" />
    </TraceSteps>
  </TraceContent>
</Trace>`}
      extraHeadings={[
        { id: "variants", text: "Plain and card", level: 2 },
        { id: "status", text: "Status", level: 2 },
        { id: "steps", text: "Steps", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="variants">Plain and card</h2>
            <p>
              <code>plain</code> reads inline in a message, with its body ruled at the start edge. <code>card</code> frames the step and shows the status in words, for tool calls and anything whose body holds code.
            </p>
            <CodeBlock
              code={`<Trace>…</Trace>
<Trace variant="card" status="error">…</Trace>`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="status">Status</h2>
            <p>
              <code>pending</code> is an empty ring, <code>running</code> a Spinner with the label shimmering, <code>done</code> a jade check, <code>error</code> a crimson alert. The same marks are used by every pattern, so a thread of mixed steps reads as one list.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="steps">Steps</h2>
            <p>
              <code>TraceSteps</code> and <code>TraceStep</code> put a sequence on a rail, each step with its own status. A step reads its status to screen readers after its title.
            </p>
          </section>
        </>
      }
    />
  )
}

import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { ReasoningDemo } from "@/components/docs/AiExamples"

export default function ReasoningPage() {
  return (
    <ComponentDocs
      name="Reasoning"
      description="The agent's thinking as it streams, on Trace. Open and shimmering while it thinks, then it folds itself once and says how long it took."
      preview={<ReasoningDemo />}
      usage={`import { Reasoning, ReasoningContent, ReasoningTrigger } from "@/components/ui/Reasoning"

<Reasoning streaming={isThinking} duration={seconds}>
  <ReasoningTrigger />
  <ReasoningContent>{reasoningText}</ReasoningContent>
</Reasoning>`}
      extraHeadings={[
        { id: "behaviour", text: "Open and fold", level: 2 },
        { id: "labels", text: "Labels", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="behaviour">Open and fold</h2>
            <p>
              It opens when <code>streaming</code> turns on and folds once when it turns off, so the reply below is what the reader sees. They can open it again. Pass <code>open</code> to take over.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="labels">Labels</h2>
            <p>
              Translate the two states on the trigger.
            </p>
            <CodeBlock
              code={`<ReasoningTrigger
  thinkingLabel="Réflexion…"
  doneLabel={(s) => \`Réfléchi pendant \${Math.round(s ?? 0)} s\`}
/>`}
            />
          </section>
        </>
      }
    />
  )
}

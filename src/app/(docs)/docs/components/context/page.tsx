import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { ContextDemo } from "@/components/docs/AiExamples"

export default function ContextPage() {
  return (
    <ComponentDocs
      name="Context"
      description="How much of the context window the conversation has used: a ring and a percentage, with the breakdown and the cost on click."
      preview={<ContextDemo />}
      usage={`import { Context } from "@/components/ui/Context"

<Context
  used={usage.totalTokens}
  max={200_000}
  usage={{ input: 41_000, output: 5_800, reasoning: 1_400, cached: 32_000 }}
  cost="$0.04"
  model="Lumen Large"
/>`}
      extraHeadings={[
        { id: "tone", text: "Warnings", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="tone">Warnings</h2>
            <p>
              The ring is ink up to 70%, orange from 70%, crimson from 90%, so the reader sees it filling up before it overflows.
            </p>
          </section>
        </>
      }
    />
  )
}

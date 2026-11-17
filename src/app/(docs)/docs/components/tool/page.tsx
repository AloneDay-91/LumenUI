import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { ToolDemo } from "@/components/docs/AiExamples"

export default function ToolPage() {
  return (
    <ComponentDocs
      name="Tool"
      description="A tool call the agent makes, from input to output: a card Trace with the name in mono, the arguments and the result in Code Blocks."
      preview={<ToolDemo />}
      usage={`import { Tool, ToolContent, ToolInput, ToolOutput, ToolTrigger } from "@/components/ui/Tool"

<Tool name="get_weather" status="done">
  <ToolTrigger meta="240ms" />
  <ToolContent>
    <ToolInput value={{ city: "Lyon" }} />
    <ToolOutput value={{ temperature: 14 }} />
  </ToolContent>
</Tool>`}
      extraHeadings={[
        { id: "output", text: "Output", level: 2 },
        { id: "approval", text: "Before it runs", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="output">Output</h2>
            <p>
              <code>value</code> takes a string or anything JSON can print. <code>error</code> shows a crimson block instead. Children render a result your way: a table, a link, an image.
            </p>
            <CodeBlock
              code={`<ToolOutput>
  <a href={issue.url}>Issue #{issue.number}</a>
</ToolOutput>`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="approval">Before it runs</h2>
            <p>
              When a tool needs the person's go-ahead, show a Confirmation first and the Tool once it runs.
            </p>
          </section>
        </>
      }
    />
  )
}

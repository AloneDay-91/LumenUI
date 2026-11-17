import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { TerminalDemo } from "@/components/docs/AiExamples"

export default function TerminalPage() {
  return (
    <ComponentDocs
      name="Terminal"
      description="A command the agent runs, with its output as it streams. A dark pane in both themes; the exit code sets the status."
      preview={<TerminalDemo />}
      usage={`import { Terminal } from "@/components/ui/Terminal"

<Terminal command="npm test" output={output} exitCode={exitCode} />`}
      extraHeadings={[
        { id: "streaming", text: "Streaming", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="streaming">Streaming</h2>
            <p>
              Until <code>exitCode</code> arrives the status is running, a cursor blinks and the pane follows the output. Exit 0 is done, anything else failed and the output turns red. The output is a polite live region while it runs.
            </p>
          </section>
        </>
      }
    />
  )
}

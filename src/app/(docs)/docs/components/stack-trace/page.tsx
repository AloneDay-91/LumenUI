import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { StackTraceDemo } from "@/components/docs/AiExamples"

export default function StackTracePage() {
  return (
    <ComponentDocs
      name="Stack Trace"
      description="A failed call and its stack frames. Your code first; frames from dependencies fold behind a count."
      preview={<StackTraceDemo />}
      usage={`import { StackTrace } from "@/components/ui/StackTrace"

<StackTrace name={error.name} message={error.message} stack={error.stack} />`}
      extraHeadings={[
        { id: "frames", text: "Frames", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="frames">Frames</h2>
            <p>
              Pass a raw <code>stack</code> string and it is parsed for you; frames under node_modules or node: are marked internal. Or pass <code>frames</code> you parsed yourself, from a Python or Go trace for example.
            </p>
          </section>
        </>
      }
    />
  )
}

import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { ConfirmationDemo } from "@/components/docs/AiExamples"

export default function ConfirmationPage() {
  return (
    <ComponentDocs
      name="Confirmation"
      description="Asks before a tool runs: what it will do, the arguments, then Approve or Deny. Once answered it shrinks to one line."
      preview={<ConfirmationDemo />}
      usage={`import { Confirmation } from "@/components/ui/Confirmation"

<Confirmation
  title="Delete the branch feat/old-banner?"
  description="This cannot be undone."
  input={{ branch: "feat/old-banner" }}
  state={state}
  onApprove={() => approve(call.id)}
  onDeny={() => deny(call.id)}
/>`}
      extraHeadings={[
        { id: "ai-sdk", text: "With the AI SDK", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="ai-sdk">With the AI SDK</h2>
            <p>
              Show it for a tool part whose state asks for approval, and send the answer back with <code>addToolApprovalResponse</code>. Then render the Tool as it runs.
            </p>
          </section>
        </>
      }
    />
  )
}

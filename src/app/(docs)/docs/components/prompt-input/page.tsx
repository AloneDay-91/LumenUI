import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { PromptWithAttachmentsDemo } from "@/components/docs/AiExamples"

export default function PromptInputPage() {
  return (
    <ComponentDocs
      name="Prompt Input"
      description="The composer: a textarea that grows with the text, a toolbar for attachments and the model, and a button that sends while ready and stops while streaming."
      preview={<PromptWithAttachmentsDemo />}
      usage={`import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
} from "@/components/ui/PromptInput"

<PromptInput status={status} onSubmit={send} onStop={stop}>
  <AttachmentList>…</AttachmentList>
  <PromptInputTextarea aria-label="Message" />
  <PromptInputToolbar>
    <Button variant="ghost" size="icon-sm" aria-label="Attach a file"><PaperclipIcon /></Button>
    <ModelSelector … />
    <PromptInputSubmit />
  </PromptInputToolbar>
</PromptInput>`}
      extraHeadings={[
        { id: "status", text: "Status", level: 2 },
        { id: "keys", text: "Send keys", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="status">Status</h2>
            <p>
              <code>ready</code> sends. <code>submitted</code> shows a Spinner on the button. <code>streaming</code> turns it into a stop button when <code>onStop</code> is set. These are the four values of <code>useChat</code>, so the AI SDK status plugs in as is.
            </p>
          </section>
          <section className="space-y-4">
            <h2 id="keys">Send keys</h2>
            <p>
              Enter sends and Shift+Enter breaks the line. With <code>submitOn="mod-enter"</code>, ⌘ or Ctrl+Enter sends instead. Enter during an IME composition never sends.
            </p>
            <CodeBlock
              code={`<PromptInput submitOn="mod-enter">…</PromptInput>`}
            />
          </section>
        </>
      }
    />
  )
}

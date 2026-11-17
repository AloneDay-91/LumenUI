import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { MessageScrollerDemo } from "@/components/docs/AiExamples"

export default function MessageScrollerPage() {
  return (
    <ComponentDocs
      name="Message Scroller"
      description="A scroll area that stays pinned to the bottom while content grows, as long as the reader is there. Scroll up and it lets go; a button brings you back."
      preview={<MessageScrollerDemo />}
      usage={`import { MessageScroller } from "@/components/ui/MessageScroller"

<MessageScroller className="h-96" aria-label="Conversation">
  {messages.map((message) => <Message key={message.id} … />)}
</MessageScroller>`}
      extraHeadings={[
        { id: "behaviour", text: "Following the stream", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="behaviour">Following the stream</h2>
            <p>
              Within 48px of the bottom counts as at the bottom. While there, every size change of the content, a new message or a streamed word, scrolls it into view. Scroll up to read and the position holds; the arrow button appears to jump back to the latest.
            </p>
          </section>
        </>
      }
    />
  )
}

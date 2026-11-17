import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { MessageDemo } from "@/components/docs/AiExamples"

export default function MessagePage() {
  return (
    <ComponentDocs
      name="Message"
      description="One turn. The person's text sits in a bubble at the end edge; the agent's reply reads as plain prose at full width, with its steps above it."
      preview={<MessageDemo />}
      usage={`import {
  Message,
  MessageActions,
  MessageAvatar,
  MessageBody,
  MessageContent,
} from "@/components/ui/Message"

<Message from="assistant">
  <MessageAvatar>
    <Avatar><AvatarFallback>L</AvatarFallback></Avatar>
  </MessageAvatar>
  <MessageBody>
    <MessageContent>{answer}</MessageContent>
    <MessageActions>
      <CopyButton value={answer} size="icon-xs" />
    </MessageActions>
  </MessageBody>
</Message>`}
      extraHeadings={[
        { id: "actions", text: "Actions", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="actions">Actions</h2>
            <p>
              Copy, regenerate, rate. They fade in on hover and focus so the thread stays calm, are always reachable by Tab, and stay visible on touch screens.
            </p>
          </section>
        </>
      }
    />
  )
}

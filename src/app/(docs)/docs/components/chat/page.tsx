import { CodeBlock } from "@/components/docs/CodeBlock"
import { ComponentDocs } from "@/components/docs/ComponentDocs"
import { ChatDemo } from "@/components/docs/AiExamples"

export default function ChatPage() {
  return (
    <ComponentDocs
      name="Chat"
      description="The thread: messages in a Message Scroller, with suggestions and the Prompt Input pinned under them. Send a message to see a whole turn."
      preview={<ChatDemo />}
      usage={`import { Chat, ChatEmpty, ChatFooter, ChatMessages } from "@/components/ui/Chat"

<Chat className="h-[32rem]">
  {messages.length === 0 ? (
    <ChatEmpty>Ask about a component</ChatEmpty>
  ) : (
    <ChatMessages>
      {messages.map((message) => <Message key={message.id} … />)}
    </ChatMessages>
  )}
  <ChatFooter>
    <PromptInput status={status} onSubmit={send} onStop={stop}>…</PromptInput>
  </ChatFooter>
</Chat>`}
      extraHeadings={[
        { id: "composition", text: "Composition", level: 2 },
        { id: "ai-sdk", text: "With the AI SDK", level: 2 },
      ]}
      extra={
        <>
          <section className="space-y-4">
            <h2 id="composition">Composition</h2>
            <p>
              A Chat is Message turns inside a Message Scroller. Inside a turn, the steps the agent takes come first, Reasoning, Tool, Plan, then the reply, then Sources.
            </p>
            <CodeBlock
              code={`Chat
├── ChatMessages (Message Scroller, role="log")
│   └── Message
│       └── MessageBody
│           ├── Reasoning · Tool · Plan
│           ├── MessageContent
│           └── Sources
└── ChatFooter
    ├── Suggestions
    └── PromptInput`}
            />
          </section>
          <section className="space-y-4">
            <h2 id="ai-sdk">With the AI SDK</h2>
            <p>
              Map each message part to a pattern. Text parts become MessageContent, reasoning parts Reasoning, tool parts Tool.
            </p>
            <CodeBlock
              code={`const { messages, sendMessage, status, stop } = useChat()

{messages.map((message) => (
  <Message key={message.id} from={message.role === "user" ? "user" : "assistant"}>
    <MessageBody>
      {message.parts.map((part, i) =>
        part.type === "text" ? <MessageContent key={i}>{part.text}</MessageContent>
        : part.type === "reasoning" ? <Reasoning key={i} streaming={status === "streaming"}>…</Reasoning>
        : null
      )}
    </MessageBody>
  </Message>
))}`}
            />
          </section>
        </>
      }
    />
  )
}

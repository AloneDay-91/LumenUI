import Link from "next/link"

import { CodeBlock } from "@/components/docs/CodeBlock"
import HeadingsSetter from "@/components/docs/HeadingsSetter"
import { PageIntro } from "@/components/docs/Preview"

type Card = { slug: string; name: string; text: string }

const groups: { id: string; title: string; intro: string; cards: Card[] }[] = [
  {
    id: "thread",
    title: "The thread",
    intro: "Where the conversation lives.",
    cards: [
      { slug: "chat", name: "Chat", text: "Messages in a Message Scroller, with the composer pinned under them." },
      { slug: "message", name: "Message", text: "One turn: the person's bubble, or the agent's reply and its actions." },
      { slug: "prompt-input", name: "Prompt Input", text: "A growing field with attachments, the model, and send or stop." },
      { slug: "suggestion", name: "Suggestion", text: "A short prompt sent in one click." },
      { slug: "checkpoint", name: "Checkpoint", text: "A point in the thread you can return to." },
      { slug: "context", name: "Context", text: "How much of the context window is used, and what it cost." },
      { slug: "model-selector", name: "Model Selector", text: "Which model runs, and how hard it thinks." },
    ],
  },
  {
    id: "steps",
    title: "What the agent does",
    intro: "Every step is a Trace: an icon, a label, a status, a body that folds. A turn with mixed steps reads as one list.",
    cards: [
      { slug: "reasoning", name: "Reasoning", text: "Its thinking as it streams, folded once it is done." },
      { slug: "tool", name: "Tool", text: "A tool call, from input to output." },
      { slug: "confirmation", name: "Confirmation", text: "Approve or deny a tool before it runs." },
      { slug: "chain-of-thought", name: "Chain of Thought", text: "A summary that expands into the steps taken." },
      { slug: "plan", name: "Plan", text: "The steps it plans, and how far it has got." },
      { slug: "task", name: "Task", text: "The steps it takes, as it takes them." },
      { slug: "queue", name: "Queue", text: "Its todo list: what is left and what is done." },
      { slug: "subagent", name: "Subagent", text: "A run handed to another agent, with its tools and result." },
    ],
  },
  {
    id: "output",
    title: "What it produces",
    intro: "Code, commands, and their results.",
    cards: [
      { slug: "terminal", name: "Terminal", text: "A command and its output as it streams." },
      { slug: "test-results", name: "Test Results", text: "A test run, with its suites and failures." },
      { slug: "stack-trace", name: "Stack Trace", text: "A failed call and its frames." },
      { slug: "file-tree", name: "File Tree", text: "The files it changed, as a folder tree." },
    ],
  },
  {
    id: "answer",
    title: "Where the answer comes from",
    intro: "Show the reader what the reply rests on.",
    cards: [
      { slug: "sources", name: "Sources", text: "The links used for a reply." },
      { slug: "inline-citation", name: "Inline Citation", text: "A source in the sentence, previewed on hover." },
    ],
  },
  {
    id: "blocks",
    title: "Building blocks",
    intro: "Components the patterns are made of. Use them on their own too.",
    cards: [
      { slug: "trace", name: "Trace", text: "The shape every agent step shares." },
      { slug: "message-scroller", name: "Message Scroller", text: "Stays at the bottom while the reply streams." },
      { slug: "code-block", name: "Code Block", text: "Code with a file name and a copy button." },
      { slug: "attachment", name: "Attachment", text: "A file on its way into a message." },
    ],
  },
]

const fromShadcn: [string, string, string][] = [
  ["conversation", "Chat", "chat"],
  ["message", "Message", "message"],
  ["prompt-input", "Prompt Input", "prompt-input"],
  ["reasoning", "Reasoning", "reasoning"],
  ["tool", "Tool", "tool"],
  ["chain-of-thought", "Chain of Thought", "chain-of-thought"],
  ["plan", "Plan", "plan"],
  ["task", "Task", "task"],
  ["queue", "Queue", "queue"],
  ["agent", "Subagent", "subagent"],
  ["confirmation", "Confirmation", "confirmation"],
  ["checkpoint", "Checkpoint", "checkpoint"],
  ["context", "Context", "context"],
  ["model-selector", "Model Selector", "model-selector"],
  ["sources", "Sources", "sources"],
  ["inline-citation", "Inline Citation", "inline-citation"],
  ["suggestion", "Suggestion", "suggestion"],
  ["terminal", "Terminal", "terminal"],
  ["stack-trace", "Stack Trace", "stack-trace"],
  ["test-results", "Test Results", "test-results"],
  ["file-tree", "File Tree", "file-tree"],
  ["code-block", "Code Block", "code-block"],
  ["attachments", "Attachment", "attachment"],
  ["shimmer", "shimmer utility", "/docs/utils/shimmer"],
]

export default function AiPage() {
  return (
    <>
      <HeadingsSetter
        headings={[
          { id: "ai-patterns", text: "AI patterns", level: 1 },
          ...groups.map((group) => ({ id: group.id, text: group.title, level: 2 as const })),
          { id: "install", text: "Install", level: 2 },
          { id: "from-ai-elements", text: "From AI Elements", level: 2 },
        ]}
      />
      <div className="space-y-12">
        <PageIntro
          title="AI patterns"
          description="Components for agentic interfaces. A Chat is Message turns in a Message Scroller; the steps an agent takes inside a turn are all built on Trace, so they share one shape. Each one copies into your project like any other component."
        />

        {groups.map((group) => (
          <section key={group.id} className="space-y-4">
            <h2 id={group.id}>{group.title}</h2>
            <p>{group.intro}</p>
            <ul className="m-0 grid list-none gap-2 p-0 sm:grid-cols-2">
              {group.cards.map((card) => (
                <li key={card.slug}>
                  <Link
                    href={`/docs/components/${card.slug}`}
                    className="flex h-full flex-col gap-1 rounded-2xl border border-border bg-card p-4 no-underline transition-colors hover:bg-muted/50 focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none"
                  >
                    <span className="text-sm font-medium text-foreground">{card.name}</span>
                    <span className="text-xs leading-5 text-muted-foreground">{card.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="space-y-4">
          <h2 id="install">Install</h2>
          <p>
            Each pattern is a component: the CLI copies it with Trace and anything
            else it needs. The statuses of Prompt Input are the ones of the AI SDK{" "}
            <code>useChat</code>, so they plug in as is.
          </p>
          <CodeBlock
            language="bash"
            code={`npx @aloneday/lumenui@latest add chat message prompt-input reasoning tool`}
          />
        </section>

        <section className="space-y-4">
          <h2 id="from-ai-elements">From AI Elements</h2>
          <p>
            Coming from shadcn/ui AI Elements or elements.ai-sdk.dev? The names
            mostly match. Here is where each file lands in Lumen.
          </p>
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>AI Elements</th>
                  <th>Lumen</th>
                </tr>
              </thead>
              <tbody>
                {fromShadcn.map(([from, to, slug]) => (
                  <tr key={from}>
                    <td>
                      <code>{from}.tsx</code>
                    </td>
                    <td>
                      <Link href={slug.startsWith("/") ? slug : `/docs/components/${slug}`}>{to}</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  )
}

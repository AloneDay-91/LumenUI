"use client"

import * as React from "react"
import { PaperclipIcon, RefreshCwIcon, SearchIcon, ThumbsUpIcon } from "lucide-react"

import { Attachment, AttachmentList } from "@/components/ui/Attachment"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { Button } from "@/components/ui/Button"
import { ChainOfThought, ChainOfThoughtStep } from "@/components/ui/ChainOfThought"
import { Chat, ChatEmpty, ChatFooter, ChatMessages } from "@/components/ui/Chat"
import { Checkpoint } from "@/components/ui/Checkpoint"
import { CodeBlock } from "@/components/ui/CodeBlock"
import { Confirmation, type ConfirmationState } from "@/components/ui/Confirmation"
import { Context } from "@/components/ui/Context"
import { CopyButton } from "@/components/ui/CopyButton"
import { FileTree } from "@/components/ui/FileTree"
import { InlineCitation } from "@/components/ui/InlineCitation"
import {
  Message,
  MessageActions,
  MessageAvatar,
  MessageBody,
  MessageContent,
} from "@/components/ui/Message"
import { MessageScroller } from "@/components/ui/MessageScroller"
import { ModelSelector } from "@/components/ui/ModelSelector"
import { Plan, type PlanItem } from "@/components/ui/Plan"
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  type PromptStatus,
} from "@/components/ui/PromptInput"
import { Queue } from "@/components/ui/Queue"
import { Reasoning, ReasoningContent, ReasoningTrigger } from "@/components/ui/Reasoning"
import { Sources } from "@/components/ui/Sources"
import { StackTrace } from "@/components/ui/StackTrace"
import { Subagent, SubagentResult, SubagentSteps, SubagentTask } from "@/components/ui/Subagent"
import { Suggestion, Suggestions } from "@/components/ui/Suggestion"
import { Task, TaskFile, TaskItem } from "@/components/ui/Task"
import { Terminal } from "@/components/ui/Terminal"
import { TestResults } from "@/components/ui/TestResults"
import { Tool, ToolContent, ToolInput, ToolOutput, ToolTrigger } from "@/components/ui/Tool"
import { Trace, TraceContent, TraceSection, TraceStep, TraceSteps, TraceTrigger } from "@/components/ui/Trace"

const answer =
  "Use a Split Button when one action is the obvious one and the others are variants of it, like publishing now or later. If the actions are unrelated, a Menu on its own reads better."

const sources = [
  { href: "https://lumen-ui.dev/docs/components/split-button", title: "Split Button" },
  { href: "https://lumen-ui.dev/docs/choose", title: "Choose a component" },
  { href: "https://developer.mozilla.org/docs/Web/Accessibility/ARIA/Roles/menu_role", title: "ARIA: menu role" },
]

/* ---------- Foundations ---------- */

export function TraceDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Trace defaultOpen>
        <TraceTrigger icon={<SearchIcon />} label="Searched the docs" meta="0.8s" />
        <TraceContent>
          <TraceSteps>
            <TraceStep title="Read the Split Button page" />
            <TraceStep title="Compared it with Menu" />
            <TraceStep status="running" title="Writing the answer" />
          </TraceSteps>
        </TraceContent>
      </Trace>
      <Trace variant="card" status="done">
        <TraceTrigger icon={<SearchIcon />} label="search_docs" meta="120ms" />
        <TraceContent>
          <TraceSection label="Input">
            <code className="font-mono">{`{ "query": "split button" }`}</code>
          </TraceSection>
          <TraceSection label="Output">1 page found.</TraceSection>
        </TraceContent>
      </Trace>
    </div>
  )
}

export function CodeBlockDemo() {
  return (
    <CodeBlock
      className="w-full max-w-md"
      title="lumen.json"
      lineNumbers
      code={`{
  "style": "lumen",
  "aliases": {
    "components": "@/components/ui",
    "utils": "@/lib/utils"
  }
}`}
    />
  )
}

export function MessageScrollerDemo() {
  const [lines, setLines] = React.useState(() => Array.from({ length: 6 }, (_, i) => `Line ${i + 1}`))
  React.useEffect(() => {
    const id = setInterval(() => setLines((all) => (all.length > 60 ? all : [...all, `Line ${all.length + 1}`])), 900)
    return () => clearInterval(id)
  }, [])
  return (
    <MessageScroller className="h-48 w-full max-w-md rounded-2xl border border-border" aria-label="Streaming log">
      <ol className="m-0 flex list-none flex-col gap-1 p-3 font-mono text-xs text-muted-foreground">
        {lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ol>
    </MessageScroller>
  )
}

export function AttachmentDemo() {
  const [files, setFiles] = React.useState([
    { name: "brief.pdf", type: "application/pdf", size: 182_000 },
    { name: "tokens.json", type: "application/json", size: 4_200 },
    { name: "notes.md", type: "text/markdown", size: 1_100 },
  ])
  return (
    <AttachmentList>
      {files.map((file) => (
        <Attachment
          key={file.name}
          {...file}
          onRemove={() => setFiles((all) => all.filter((f) => f.name !== file.name))}
        />
      ))}
    </AttachmentList>
  )
}

/* ---------- Thread ---------- */

export function MessageDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Message from="user">
        <MessageBody>
          <MessageContent>When should I use a Split Button?</MessageContent>
        </MessageBody>
      </Message>
      <Message from="assistant">
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>L</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageBody>
          <MessageContent>
            <p>{answer}</p>
          </MessageContent>
          <MessageActions>
            <CopyButton value={answer} size="icon-xs" />
            <Button variant="ghost" size="icon-xs" aria-label="Regenerate">
              <RefreshCwIcon />
            </Button>
            <Button variant="ghost" size="icon-xs" aria-label="Good answer">
              <ThumbsUpIcon />
            </Button>
          </MessageActions>
        </MessageBody>
      </Message>
    </div>
  )
}

type Turn = { id: number; question: string; answer: string; tool: "running" | "done" | "error"; thinking: boolean }

/** A whole chat: send, think, call a tool, stream. Nothing leaves the page. */
export function ChatDemo() {
  const [turns, setTurns] = React.useState<Turn[]>([])
  const [status, setStatus] = React.useState<PromptStatus>("ready")
  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([])

  React.useEffect(() => () => timers.current.forEach(clearTimeout), [])

  function stop() {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setStatus("ready")
    setTurns((all) => all.map((t) => ({ ...t, thinking: false, tool: t.tool === "running" ? "error" : t.tool })))
  }

  function send(question: string) {
    const id = Date.now()
    setStatus("submitted")
    setTurns((all) => [...all, { id, question, answer: "", tool: "running", thinking: true }])
    const update = (patch: Partial<Turn>) =>
      setTurns((all) => all.map((t) => (t.id === id ? { ...t, ...patch } : t)))
    const at = (ms: number, fn: () => void) => timers.current.push(setTimeout(fn, ms))
    at(400, () => setStatus("streaming"))
    at(1400, () => update({ thinking: false }))
    at(2000, () => update({ tool: "done" }))
    const words = answer.split(" ")
    words.forEach((_, i) => at(2200 + i * 45, () => update({ answer: words.slice(0, i + 1).join(" ") })))
    at(2200 + words.length * 45, () => setStatus("ready"))
  }

  return (
    <Chat className="h-[28rem] w-full max-w-md">
      {turns.length === 0 ? (
        <ChatEmpty>
          <span className="font-medium text-foreground">Ask about a component</span>
          <span>Pick a suggestion or write your own.</span>
        </ChatEmpty>
      ) : (
        <ChatMessages>
          {turns.map((turn) => (
            <React.Fragment key={turn.id}>
              <Message from="user">
                <MessageBody>
                  <MessageContent>{turn.question}</MessageContent>
                </MessageBody>
              </Message>
              <Message from="assistant">
                <MessageBody>
                  <Reasoning streaming={turn.thinking} duration={1}>
                    <ReasoningTrigger />
                    <ReasoningContent>
                      The question is about Split Button. Check when it fits, then answer in two sentences.
                    </ReasoningContent>
                  </Reasoning>
                  <Tool name="search_docs" status={turn.tool}>
                    <ToolTrigger />
                    <ToolContent>
                      <ToolInput value={{ query: "split button when to use" }} />
                      {turn.tool === "error" ? (
                        <ToolOutput error="Stopped before the search finished." />
                      ) : (
                        <ToolOutput value={turn.tool === "done" ? { pages: ["/docs/components/split-button"] } : undefined} />
                      )}
                    </ToolContent>
                  </Tool>
                  {turn.answer ? (
                    <MessageContent>
                      <p>{turn.answer}</p>
                    </MessageContent>
                  ) : null}
                  {turn.answer && status === "ready" ? <Sources sources={sources.slice(0, 2)} /> : null}
                </MessageBody>
              </Message>
            </React.Fragment>
          ))}
        </ChatMessages>
      )}
      <ChatFooter>
        {turns.length === 0 ? (
          <Suggestions>
            {["When should I use a Split Button?", "Menu or Select?", "How do I theme Lumen?"].map((text) => (
              <Suggestion key={text} suggestion={text} onSelect={send} />
            ))}
          </Suggestions>
        ) : null}
        <PromptDemo status={status} onSubmit={send} onStop={stop} />
      </ChatFooter>
    </Chat>
  )
}

export function PromptDemo({
  status = "ready",
  onSubmit,
  onStop,
  stoppable = false,
  withAttachments = false,
}: {
  status?: PromptStatus
  onSubmit?: (value: string) => void
  onStop?: () => void
  /** For server pages, which cannot pass a function: shows the stop button. */
  stoppable?: boolean
  withAttachments?: boolean
}) {
  const [model, setModel] = React.useState("lumen-large")
  const [effort, setEffort] = React.useState("medium")
  return (
    <PromptInput
      status={status}
      onSubmit={onSubmit}
      onStop={onStop ?? (stoppable ? () => {} : undefined)}
      className="w-full max-w-md"
    >
      {withAttachments ? (
        <AttachmentList className="px-1 pt-1">
          <Attachment name="brief.pdf" type="application/pdf" size={182_000} onRemove={() => {}} />
        </AttachmentList>
      ) : null}
      <PromptInputTextarea aria-label="Message" />
      <PromptInputToolbar>
        <Button variant="ghost" size="icon-sm" aria-label="Attach a file" type="button">
          <PaperclipIcon />
        </Button>
        {withAttachments ? (
          <ModelSelector
            models={[
              { value: "lumen-large", label: "Lumen Large" },
              { value: "lumen-small", label: "Lumen Small" },
            ]}
            model={model}
            onModelChange={setModel}
            effort={effort}
            onEffortChange={setEffort}
          />
        ) : null}
        <PromptInputSubmit />
      </PromptInputToolbar>
    </PromptInput>
  )
}

/* ---------- Steps ---------- */

export function ReasoningDemo() {
  const [streaming, setStreaming] = React.useState(false)
  return (
    <div className="flex w-full max-w-md flex-col items-start gap-4">
      <Reasoning streaming={streaming} duration={4}>
        <ReasoningTrigger />
        <ReasoningContent>
          {`The reader wants a date range filter.\nDate Picker already has a range mode, so the answer is to compose it with Filter Bar.`}
        </ReasoningContent>
      </Reasoning>
      <Button
        variant="outline"
        size="sm"
        disabled={streaming}
        onClick={() => {
          setStreaming(true)
          setTimeout(() => setStreaming(false), 2500)
        }}
      >
        Replay
      </Button>
    </div>
  )
}

export function ToolDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Tool name="get_weather" status="done" defaultOpen>
        <ToolTrigger meta="240ms" />
        <ToolContent>
          <ToolInput value={{ city: "Lyon", unit: "celsius" }} />
          <ToolOutput value={{ temperature: 14, sky: "overcast" }} />
        </ToolContent>
      </Tool>
      <Tool name="search_docs" status="running">
        <ToolTrigger />
        <ToolContent>
          <ToolInput value={{ query: "tag input paste" }} />
        </ToolContent>
      </Tool>
      <Tool name="create_issue" status="error">
        <ToolTrigger />
        <ToolContent>
          <ToolInput value={{ title: "Tour skips a step" }} />
          <ToolOutput error="403: the token cannot write issues." />
        </ToolContent>
      </Tool>
    </div>
  )
}

export function ChainOfThoughtDemo() {
  return (
    <ChainOfThought summary="Looked into date filters in 3 steps" defaultOpen className="w-full max-w-md">
      <ChainOfThoughtStep title="Read the Date Picker docs" description="It has a range mode." />
      <ChainOfThoughtStep title="Checked Filter Bar">
        <span className="flex flex-wrap gap-1.5">
          <TaskFile>FilterBar.tsx</TaskFile>
          <TaskFile>DatePicker.tsx</TaskFile>
        </span>
      </ChainOfThoughtStep>
      <ChainOfThoughtStep title="Composed the two in one toolbar" />
    </ChainOfThought>
  )
}

export function PlanDemo() {
  const [steps, setSteps] = React.useState<PlanItem[]>([
    { id: "1", title: "Add a range mode to the filter", status: "done" },
    { id: "2", title: "Wire it to Data Table", status: "done" },
    { id: "3", title: "Write the docs page", status: "running", description: "Usage, API, and an example." },
    { id: "4", title: "Add a changelog entry", status: "pending" },
  ])
  return (
    <div className="flex w-full max-w-md flex-col items-start gap-3">
      <Plan title="Date filter" steps={steps} className="w-full" />
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          setSteps((all) => {
            const i = all.findIndex((s) => s.status !== "done")
            if (i === -1) return all.map((s) => ({ ...s, status: s.id === "1" || s.id === "2" ? "done" : s.id === "3" ? "running" : "pending" }))
            return all.map((s, j) => (j === i ? { ...s, status: "done" } : j === i + 1 ? { ...s, status: "running" } : s))
          })
        }
      >
        Next step
      </Button>
    </div>
  )
}

export function TaskDemo() {
  return (
    <Task title="Finding where Banner is used" className="w-full max-w-md">
      <TaskItem title="Searched for “<Banner”" description="4 matches in 3 files." />
      <TaskItem title="Read the files">
        <span className="flex flex-wrap gap-1.5">
          <TaskFile>UpdateBanner.tsx</TaskFile>
          <TaskFile>page.tsx</TaskFile>
        </span>
      </TaskItem>
      <TaskItem status="running" title="Checking the props each one passes" />
    </Task>
  )
}

export function QueueDemo() {
  return (
    <Queue
      className="w-full max-w-md"
      items={[
        { id: "1", title: "Rename Chat Message to Message", status: "done" },
        { id: "2", title: "Build Reasoning on Trace", status: "done" },
        { id: "3", title: "Write the Plan pattern", status: "running" },
        { id: "4", title: "Add the AI overview page", status: "pending" },
        { id: "5", title: "Update From shadcn", status: "pending" },
      ]}
    />
  )
}

export function SubagentDemo() {
  return (
    <Subagent name="Docs researcher" meta="3 tools · 4.2s" defaultOpen className="w-full max-w-md">
      <SubagentTask>Find every page that mentions Split Button and list what each says.</SubagentTask>
      <SubagentSteps>
        <Tool name="search_docs" status="done">
          <ToolTrigger meta="90ms" />
          <ToolContent>
            <ToolInput value={{ query: "split button" }} />
          </ToolContent>
        </Tool>
        <Tool name="read_page" status="done">
          <ToolTrigger meta="140ms" />
          <ToolContent>
            <ToolInput value={{ path: "/docs/choose" }} />
          </ToolContent>
        </Tool>
      </SubagentSteps>
      <SubagentResult>Two pages: the component page, and Choose a component under Actions.</SubagentResult>
    </Subagent>
  )
}

/* ---------- Output ---------- */

const testOutput = `> lumen@1.1.0 test
> node --test

✔ init writes lumen.json (7ms)
✔ add copies the component (8ms)
✔ rm keeps a file another one imports (6ms)
ℹ tests 16
ℹ pass 16`

export function TerminalDemo() {
  const [output, setOutput] = React.useState("")
  const [exit, setExit] = React.useState<number | undefined>(undefined)
  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([])

  // Only schedules: every state change happens in a timer, not in the effect.
  const schedule = React.useCallback(() => {
    const lines = testOutput.split("\n")
    timers.current = [
      ...lines.map((line, i) =>
        setTimeout(() => setOutput((o) => (o ? `${o}\n${line}` : line)), 250 * (i + 1))
      ),
      setTimeout(() => setExit(0), 250 * (lines.length + 1)),
    ]
  }, [])

  React.useEffect(() => {
    schedule()
    return () => timers.current.forEach(clearTimeout)
  }, [schedule])

  const run = () => {
    setOutput("")
    setExit(undefined)
    schedule()
  }
  return (
    <div className="flex w-full max-w-md flex-col items-start gap-3">
      <Terminal command="npm test" output={output} exitCode={exit} className="w-full" />
      <Button variant="outline" size="sm" onClick={run} disabled={exit === undefined}>
        Run again
      </Button>
    </div>
  )
}

const stack = `TypeError: Cannot read properties of undefined (reading 'map')
    at renderItems (/app/src/components/ui/Queue.tsx:42:18)
    at Queue (/app/src/components/ui/Queue.tsx:31:7)
    at renderWithHooks (/app/node_modules/react-dom/cjs/react-dom.development.js:16305:18)
    at mountIndeterminateComponent (/app/node_modules/react-dom/cjs/react-dom.development.js:20074:13)
    at beginWork (/app/node_modules/react-dom/cjs/react-dom.development.js:21587:16)`

export function StackTraceDemo() {
  return (
    <StackTrace
      className="w-full max-w-md"
      name="TypeError"
      message="Cannot read properties of undefined (reading 'map')"
      stack={stack}
    />
  )
}

export function TestResultsDemo() {
  return (
    <TestResults
      className="w-full max-w-md"
      suites={[
        {
          name: "cli/test/add.test.js",
          tests: [
            { name: "copies the component", status: "passed", duration: 8 },
            { name: "rewrites imports to the aliases", status: "passed", duration: 6 },
            {
              name: "keeps a file the user edited",
              status: "failed",
              duration: 9,
              error: "Expected Button.tsx to be unchanged, but it was overwritten.",
            },
          ],
        },
        {
          name: "cli/test/rm.test.js",
          tests: [
            { name: "deletes the component", status: "passed", duration: 6 },
            { name: "refuses a shared file without --force", status: "skipped" },
          ],
        },
      ]}
    />
  )
}

export function FileTreeDemo() {
  return (
    <FileTree
      className="w-full max-w-xs"
      files={[
        {
          name: "src",
          children: [
            {
              name: "components",
              children: [
                { name: "Trace.tsx", change: "added" },
                { name: "Reasoning.tsx", change: "modified" },
                { name: "ToolCall.tsx", change: "deleted" },
              ],
            },
            { name: "lib", children: [{ name: "docs-nav.ts", change: "modified" }] },
          ],
        },
        { name: "package.json" },
      ]}
    />
  )
}

/* ---------- Answer ---------- */

export function SourcesDemo() {
  return <Sources sources={sources} defaultOpen className="w-full max-w-md" />
}

export function InlineCitationDemo() {
  return (
    <p className="m-0 max-w-md text-sm leading-7">
      A Split Button pairs one main action with a menu of variants
      <InlineCitation
        href={sources[0].href}
        title="Split Button"
        excerpt="A main action joined to a menu of related ones, with the variant and size set once."
      />
      . When the actions are unrelated, use a Menu on its own
      <InlineCitation
        href={sources[2].href}
        title="ARIA: menu role"
        excerpt="A menu offers a list of choices to the user, such as a set of actions or functions."
      />
      .
    </p>
  )
}

export function SuggestionDemo() {
  const [picked, setPicked] = React.useState<string | null>(null)
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Suggestions>
        {["Summarise this page", "Show me an example", "What changed in 1.1?", "Compare with shadcn"].map((text) => (
          <Suggestion key={text} suggestion={text} onSelect={setPicked} />
        ))}
      </Suggestions>
      <p className="m-0 text-xs text-muted-foreground">{picked ? `Sent: ${picked}` : "Nothing sent yet."}</p>
    </div>
  )
}

export function ConfirmationDemo() {
  const [state, setState] = React.useState<ConfirmationState>("pending")
  return (
    <div className="flex w-full max-w-md flex-col items-start gap-3">
      <Confirmation
        className="w-full"
        title="Delete the branch feat/old-banner?"
        description="The agent wants to run delete_branch. This cannot be undone."
        input={{ repository: "lumen-ui", branch: "feat/old-banner" }}
        state={state}
        onApprove={() => setState("approved")}
        onDeny={() => setState("denied")}
      />
      {state !== "pending" ? (
        <Button variant="outline" size="sm" onClick={() => setState("pending")}>
          Ask again
        </Button>
      ) : null}
    </div>
  )
}

export function CheckpointDemo() {
  const [restored, setRestored] = React.useState(false)
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Message from="user">
        <MessageBody>
          <MessageContent>Rename the banner variants.</MessageContent>
        </MessageBody>
      </Message>
      <Checkpoint label="Before renaming" onRestore={() => setRestored(true)} />
      <Message from="assistant">
        <MessageBody>
          <MessageContent>{restored ? "Restored. The variants are back to their old names." : "Done: info, success, warning, destructive."}</MessageContent>
        </MessageBody>
      </Message>
    </div>
  )
}

export function ContextDemo() {
  return (
    <div className="flex items-center gap-4">
      <Context used={48_200} max={200_000} usage={{ input: 41_000, output: 5_800, reasoning: 1_400, cached: 32_000 }} cost="$0.04" model="Lumen Large" />
      <Context used={152_000} max={200_000} />
      <Context used={191_000} max={200_000} />
    </div>
  )
}

export function ModelSelectorDemo() {
  const [model, setModel] = React.useState("lumen-large")
  const [effort, setEffort] = React.useState("medium")
  return (
    <ModelSelector
      models={[
        { value: "lumen-large", label: "Lumen Large", description: "Best answers. Thinks before it replies." },
        { value: "lumen-small", label: "Lumen Small", description: "Fast and cheap, for short tasks." },
      ]}
      model={model}
      onModelChange={setModel}
      effort={effort}
      onEffortChange={setEffort}
      showEffort={model === "lumen-large"}
    />
  )
}

export function PromptWithAttachmentsDemo() {
  return <PromptDemo withAttachments />
}

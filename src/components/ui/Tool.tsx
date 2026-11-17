"use client"

import * as React from "react"
import { WrenchIcon } from "lucide-react"

import { CodeBlock } from "@/components/ui/CodeBlock"
import {
  Trace,
  TraceContent,
  TraceSection,
  TraceTrigger,
  type TraceStatus,
} from "@/components/ui/Trace"

const ToolContext = React.createContext<{ name: string }>({ name: "" })

/** A tool call, from input to output: a card Trace with the name in mono. */
function Tool({
  name,
  status = "done",
  ...props
}: Omit<React.ComponentProps<typeof Trace>, "variant"> & {
  name: string
  status?: TraceStatus
}) {
  return (
    <ToolContext.Provider value={{ name }}>
      <Trace data-slot="tool" variant="card" status={status} {...props} />
    </ToolContext.Provider>
  )
}

function ToolTrigger(props: Omit<React.ComponentProps<typeof TraceTrigger>, "title">) {
  const { name } = React.useContext(ToolContext)
  return (
    <TraceTrigger icon={<WrenchIcon />} {...props}>
      <span className="font-mono">{name}</span>
    </TraceTrigger>
  )
}

const ToolContent = TraceContent

function format(value: unknown) {
  return typeof value === "string" ? value : JSON.stringify(value, null, 2)
}

/** The arguments, printed as indented JSON in a Code Block. */
function ToolInput({ value, label = "Input" }: { value: unknown; label?: string }) {
  return (
    <TraceSection label={label}>
      <CodeBlock code={format(value)} copyable={false} wrap className="bg-muted/60 [&>pre]:p-2.5" />
    </TraceSection>
  )
}

/** The result, or the error with `error`. Children render it your way instead. */
function ToolOutput({
  value,
  error,
  label,
  children,
}: {
  value?: unknown
  error?: React.ReactNode
  label?: string
  children?: React.ReactNode
}) {
  if (error) {
    return (
      <TraceSection label={label ?? "Error"}>
        <p className="m-0 rounded-xl bg-crimson-wash px-2.5 py-2 text-crimson-ink">{error}</p>
      </TraceSection>
    )
  }
  return (
    <TraceSection label={label ?? "Output"}>
      {children ??
        (value === undefined ? null : (
          <CodeBlock code={format(value)} copyable={false} wrap className="bg-muted/60 [&>pre]:p-2.5" />
        ))}
    </TraceSection>
  )
}

export { Tool, ToolTrigger, ToolContent, ToolInput, ToolOutput }

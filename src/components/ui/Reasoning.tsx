"use client"

import * as React from "react"
import { BrainIcon } from "lucide-react"

import { Trace, TraceContent, TraceTrigger } from "@/components/ui/Trace"
import { cn } from "@/lib/utils"

type ReasoningContextValue = { streaming: boolean; duration?: number }

const ReasoningContext = React.createContext<ReasoningContextValue>({ streaming: false })

/**
 * The agent's thinking, on Trace. Open and shimmering while `streaming`, then
 * it folds itself once and says how long it took. The reader can reopen it.
 */
function Reasoning({
  streaming = false,
  duration,
  open: openProp,
  defaultOpen,
  onOpenChange,
  ...props
}: Omit<React.ComponentProps<typeof Trace>, "status" | "variant"> & {
  streaming?: boolean
  /** Seconds spent thinking, shown once streaming ends. */
  duration?: number
}) {
  const [open, setOpen] = React.useState(defaultOpen ?? streaming)
  const [wasStreaming, setWasStreaming] = React.useState(streaming)

  // Follow the stream: open when it starts, fold once when it ends.
  if (wasStreaming !== streaming) {
    setWasStreaming(streaming)
    if (openProp === undefined) setOpen(streaming)
  }

  return (
    <ReasoningContext.Provider value={{ streaming, duration }}>
      <Trace
        data-slot="reasoning"
        status={streaming ? "running" : "done"}
        open={openProp ?? open}
        onOpenChange={(next, details) => {
          setOpen(next)
          onOpenChange?.(next, details)
        }}
        {...props}
      />
    </ReasoningContext.Provider>
  )
}

function ReasoningTrigger({
  thinkingLabel = "Thinking…",
  doneLabel = (duration?: number) =>
    duration === undefined ? "Thought" : `Thought for ${Math.max(1, Math.round(duration))}s`,
  ...props
}: Omit<React.ComponentProps<typeof TraceTrigger>, "label"> & {
  thinkingLabel?: string
  doneLabel?: (duration?: number) => string
}) {
  const { streaming, duration } = React.useContext(ReasoningContext)

  return (
    <TraceTrigger
      icon={<BrainIcon />}
      label={streaming ? thinkingLabel : doneLabel(duration)}
      {...props}
    />
  )
}

function ReasoningContent({
  className,
  ...props
}: React.ComponentProps<typeof TraceContent>) {
  return (
    <TraceContent
      className={cn("[&>div]:leading-5 [&>div]:whitespace-pre-wrap", className)}
      {...props}
    />
  )
}

export { Reasoning, ReasoningTrigger, ReasoningContent }

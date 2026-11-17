"use client"

import * as React from "react"
import { BugIcon } from "lucide-react"

import { CopyButton } from "@/components/ui/CopyButton"
import { Trace, TraceContent, TraceTrigger } from "@/components/ui/Trace"
import { cn } from "@/lib/utils"

type StackFrame = {
  fn?: string
  file: string
  line?: number
  column?: number
  /** Frames from node_modules or the runtime. Folded by default. */
  internal?: boolean
}

/** Reads a JS stack string ("at fn (file:line:col)") into frames. */
function parseStack(stack: string): StackFrame[] {
  return stack
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("at "))
    .map((line) => {
      const match =
        line.match(/^at (.+?) \((.+?):(\d+):(\d+)\)$/) ?? line.match(/^at ()(.+?):(\d+):(\d+)$/)
      if (!match) return { file: line.slice(3) }
      const [, fn, file, lineNo, column] = match
      return {
        fn: fn || undefined,
        file,
        line: Number(lineNo),
        column: Number(column),
        internal: /node_modules|node:internal|^node:/.test(file),
      }
    })
}

/**
 * A failed call: the error name and message on the row, the frames below.
 * Your code first; frames from dependencies fold behind a count.
 */
function StackTrace({
  name = "Error",
  message,
  stack,
  frames: framesProp,
  defaultOpen = true,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Trace>, "variant" | "status" | "children"> & {
  name?: string
  message: string
  /** A raw stack string, parsed for you. */
  stack?: string
  /** Or frames you parsed yourself. */
  frames?: StackFrame[]
}) {
  const frames = framesProp ?? (stack ? parseStack(stack) : [])
  const own = frames.filter((frame) => !frame.internal)
  const internal = frames.filter((frame) => frame.internal)

  return (
    <Trace data-slot="stack-trace" variant="card" status="error" defaultOpen={defaultOpen} className={className} {...props}>
      <TraceTrigger icon={<BugIcon />} showStatus={false}>
        <span className="font-mono text-crimson-ink">{name}</span>
        <span className="text-muted-foreground">: {message}</span>
      </TraceTrigger>
      <TraceContent>
        <div className="relative">
          {stack ? (
            <CopyButton value={`${name}: ${message}\n${stack}`} size="icon-xs" label="Copy stack" className="absolute end-1.5 top-1.5" />
          ) : null}
          <ol className="m-0 flex list-none flex-col p-1.5 pe-9">
            {own.map((frame, index) => (
              <FrameRow key={index} frame={frame} />
            ))}
          </ol>
          {internal.length > 0 ? (
            <details className="border-t border-border">
              <summary className="cursor-pointer list-none px-3 py-2 text-muted-foreground outline-none select-none hover:text-foreground focus-visible:bg-muted/50 [&::-webkit-details-marker]:hidden">
                {internal.length} frames from dependencies
              </summary>
              <ol className="m-0 flex list-none flex-col p-1.5 pt-0 opacity-70">
                {internal.map((frame, index) => (
                  <FrameRow key={index} frame={frame} />
                ))}
              </ol>
            </details>
          ) : null}
        </div>
      </TraceContent>
    </Trace>
  )
}

function FrameRow({ frame }: { frame: StackFrame }) {
  const location = [frame.file, frame.line, frame.column].filter((part) => part !== undefined).join(":")
  return (
    <li className={cn("flex flex-col gap-0.5 rounded-lg px-1.5 py-1 font-mono text-[11px] hover:bg-muted/60")}>
      <span className="text-foreground">{frame.fn ?? "<anonymous>"}</span>
      <span className="truncate text-muted-foreground" title={location}>
        {location}
      </span>
    </li>
  )
}

export { StackTrace, parseStack }
export type { StackFrame }

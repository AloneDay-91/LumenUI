"use client"

import * as React from "react"
import { SquareTerminalIcon } from "lucide-react"

import { CopyButton } from "@/components/ui/CopyButton"
import { Trace, TraceContent, TraceTrigger, type TraceStatus } from "@/components/ui/Trace"
import { cn } from "@/lib/utils"

/**
 * A command the agent runs and its output as it streams. Ink on a dark pane
 * in both themes, like a real terminal; the exit code sets the status.
 */
function Terminal({
  command,
  output = "",
  status,
  exitCode,
  cwd,
  maxHeight = "16rem",
  defaultOpen = true,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Trace>, "variant" | "status" | "children"> & {
  command: string
  output?: string
  /** Running until an exit code arrives, unless set. */
  status?: TraceStatus
  exitCode?: number
  cwd?: string
  maxHeight?: string
}) {
  const resolved: TraceStatus =
    status ?? (exitCode === undefined ? "running" : exitCode === 0 ? "done" : "error")
  const bodyRef = React.useRef<HTMLPreElement>(null)

  // Follow the output while it streams.
  React.useEffect(() => {
    const body = bodyRef.current
    if (body && resolved === "running") body.scrollTop = body.scrollHeight
  }, [output, resolved])

  return (
    <Trace
      data-slot="terminal"
      variant="card"
      status={resolved}
      defaultOpen={defaultOpen}
      className={className}
      {...props}
    >
      <TraceTrigger
        icon={<SquareTerminalIcon />}
        meta={exitCode !== undefined ? <span className="font-mono text-[11px]">exit {exitCode}</span> : undefined}
      >
        <span className="font-mono">{command}</span>
      </TraceTrigger>
      <TraceContent>
        <div className="relative bg-neutral-950 text-neutral-100">
          <CopyButton
            value={`$ ${command}\n${output}`}
            size="icon-xs"
            label="Copy output"
            className="absolute end-1.5 top-1.5 text-neutral-400 hover:bg-white/10 hover:text-neutral-100"
          />
          <pre
            ref={bodyRef}
            tabIndex={0}
            aria-live={resolved === "running" ? "polite" : undefined}
            className="m-0 overflow-auto p-3 pe-10 font-mono text-[12px] leading-5 whitespace-pre-wrap outline-none focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:ring-inset"
            style={{ maxHeight }}
          >
            <span className="text-neutral-500 select-none">{cwd ? `${cwd} ` : ""}$ </span>
            <span className="text-neutral-50">{command}</span>
            {"\n"}
            <span className={cn(resolved === "error" ? "text-red-300" : "text-neutral-300")}>{output}</span>
            {resolved === "running" ? (
              <span aria-hidden className="ms-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-neutral-300" />
            ) : null}
          </pre>
        </div>
      </TraceContent>
    </Trace>
  )
}

export { Terminal }

"use client"

import * as React from "react"
import { ListTodoIcon } from "lucide-react"

import {
  Trace,
  TraceContent,
  TraceStatusIcon,
  TraceTrigger,
  type TraceStatus,
} from "@/components/ui/Trace"
import { cn } from "@/lib/utils"

type QueueItem = { id: string; title: React.ReactNode; status: TraceStatus }

/**
 * The agent's todo list: what is left on top, what is done folded below it,
 * struck through. A card Trace whose meta counts what remains.
 */
function Queue({
  title = "To do",
  items,
  doneLabel = (count: number) => `Done (${count})`,
  className,
  defaultOpen = true,
  ...props
}: Omit<React.ComponentProps<typeof Trace>, "variant" | "status" | "children" | "title"> & {
  title?: React.ReactNode
  items: QueueItem[]
  doneLabel?: (count: number) => string
}) {
  const left = items.filter((item) => item.status !== "done")
  const done = items.filter((item) => item.status === "done")
  const status: TraceStatus = left.some((item) => item.status === "running")
    ? "running"
    : left.length === 0
      ? "done"
      : "pending"

  return (
    <Trace data-slot="queue" variant="card" status={status} defaultOpen={defaultOpen} className={className} {...props}>
      <TraceTrigger
        icon={<ListTodoIcon />}
        label={title}
        showStatus={false}
        meta={<span className="font-mono text-[11px]">{left.length} left</span>}
      />
      <TraceContent>
        <ul className="m-0 flex list-none flex-col gap-1.5 p-3">
          {left.map((item) => (
            <QueueRow key={item.id} item={item} />
          ))}
        </ul>
        {done.length > 0 ? (
          <details className="group/queue-done border-t border-border">
            <summary className="flex cursor-pointer list-none items-center gap-1.5 px-3 py-2 text-muted-foreground outline-none select-none hover:text-foreground focus-visible:bg-muted/50 [&::-webkit-details-marker]:hidden">
              {doneLabel(done.length)}
            </summary>
            <ul className="m-0 flex list-none flex-col gap-1.5 px-3 pb-3">
              {done.map((item) => (
                <QueueRow key={item.id} item={item} />
              ))}
            </ul>
          </details>
        ) : null}
      </TraceContent>
    </Trace>
  )
}

function QueueRow({ item }: { item: QueueItem }) {
  return (
    <li data-slot="queue-item" data-status={item.status} className="flex items-start gap-2">
      <span className="mt-0.5">
        <TraceStatusIcon status={item.status} />
      </span>
      <span
        className={cn(
          "min-w-0",
          item.status === "done" && "text-muted-foreground line-through decoration-foreground/30",
          item.status === "pending" && "text-foreground",
          item.status === "running" && "shimmer"
        )}
      >
        {item.title}
      </span>
    </li>
  )
}

export { Queue }
export type { QueueItem }

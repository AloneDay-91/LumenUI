import * as React from "react"

import { cn } from "@/lib/utils"

type MessageRole = "user" | "assistant"

/**
 * One turn. The person's text sits in a secondary bubble at the end edge; the
 * agent's reply reads as plain prose at full width, with its steps above it.
 */
function Message({
  className,
  from,
  ...props
}: React.ComponentProps<"div"> & { from: MessageRole }) {
  return (
    <div
      data-slot="message"
      data-from={from}
      className={cn(
        "group/message flex w-full gap-3",
        from === "user" ? "flex-row-reverse" : "flex-row",
        className
      )}
      {...props}
    />
  )
}

/** Holds an Avatar. Optional: most chats only show the agent's. */
function MessageAvatar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-avatar"
      className={cn("shrink-0 *:data-[slot=avatar]:size-7", className)}
      {...props}
    />
  )
}

/** Column for steps, content, actions, and meta. */
function MessageBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-body"
      className={cn(
        "flex min-w-0 flex-col gap-2",
        "group-data-[from=user]/message:max-w-[80%] group-data-[from=user]/message:items-end",
        "group-data-[from=assistant]/message:flex-1 group-data-[from=assistant]/message:gap-3",
        className
      )}
      {...props}
    />
  )
}

function MessageContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-content"
      className={cn(
        "text-sm leading-6 text-pretty break-words [&_p]:m-0 [&_p+p]:mt-3",
        "group-data-[from=user]/message:rounded-3xl group-data-[from=user]/message:bg-secondary group-data-[from=user]/message:px-4 group-data-[from=user]/message:py-2 group-data-[from=user]/message:text-secondary-foreground",
        "group-data-[from=assistant]/message:text-foreground",
        className
      )}
      {...props}
    />
  )
}

/** Copy, regenerate, rate. Shown on hover or focus so the thread stays calm. */
function MessageActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-actions"
      className={cn(
        "flex items-center gap-0.5 text-muted-foreground opacity-0 transition-opacity",
        "group-hover/message:opacity-100 focus-within:opacity-100 [@media(hover:none)]:opacity-100",
        className
      )}
      {...props}
    />
  )
}

function MessageMeta({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-meta"
      className={cn("text-xs text-muted-foreground tabular-nums", className)}
      {...props}
    />
  )
}

export { Message, MessageAvatar, MessageBody, MessageContent, MessageActions, MessageMeta }
export type { MessageRole }

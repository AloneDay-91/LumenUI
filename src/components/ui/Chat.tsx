"use client"

import * as React from "react"

import { MessageScroller } from "@/components/ui/MessageScroller"
import { cn } from "@/lib/utils"

/**
 * The thread: a column with the messages in a Message Scroller and the
 * composer pinned under them. Give it a height; the messages scroll inside.
 */
function Chat({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat"
      className={cn("flex min-h-0 flex-col gap-3", className)}
      {...props}
    />
  )
}

/** The messages. A polite log region inside a Message Scroller. */
function ChatMessages({
  className,
  contentClassName,
  children,
  ...props
}: React.ComponentProps<typeof MessageScroller> & { contentClassName?: string }) {
  return (
    <MessageScroller className={cn("flex-1", className)} {...props}>
      <div
        role="log"
        aria-live="polite"
        data-slot="chat-messages"
        className={cn("flex flex-col gap-6 p-1 pb-4", contentClassName)}
      >
        {children}
      </div>
    </MessageScroller>
  )
}

/** Under the messages: suggestions, then the Prompt Input. */
function ChatFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="chat-footer" className={cn("flex flex-col gap-2", className)} {...props} />
  )
}

/** Shown before the first message. */
function ChatEmpty({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="chat-empty"
      className={cn(
        "flex flex-1 flex-col items-center justify-center gap-1 text-center text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export { Chat, ChatMessages, ChatFooter, ChatEmpty }

"use client"

import * as React from "react"
import { BellIcon } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover"
import { RelativeTime } from "@/components/ui/RelativeTime"
import { cn } from "@/lib/utils"

type NotificationItem = {
  id: string
  title: React.ReactNode
  description?: React.ReactNode
  date?: Date | string | number
  read?: boolean
  icon?: React.ReactNode
}

/**
 * A bell with an unread count that opens the list. Reading state is yours:
 * mark items read in `onItemClick` and `onMarkAllRead`.
 */
function NotificationCenter({
  className,
  notifications,
  onItemClick,
  onMarkAllRead,
  labels = {},
  empty,
}: {
  className?: string
  notifications: NotificationItem[]
  onItemClick?: (item: NotificationItem) => void
  onMarkAllRead?: () => void
  labels?: {
    trigger?: (unread: number) => string
    title?: string
    markAllRead?: string
  }
  empty?: React.ReactNode
}) {
  const unread = notifications.filter((item) => !item.read).length
  const triggerLabel =
    labels.trigger?.(unread) ??
    (unread > 0 ? `Notifications, ${unread} unread` : "Notifications")

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={triggerLabel}
            data-slot="notification-center-trigger"
            className={cn("relative", className)}
          />
        }
      >
        <BellIcon aria-hidden />
        {unread > 0 ? (
          <span
            aria-hidden
            className="absolute end-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-crimson-solid px-1 font-mono text-[10px] leading-none font-medium text-crimson-on-solid tabular-nums ring-2 ring-background"
          >
            {unread > 9 ? "9+" : unread}
          </span>
        ) : null}
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-2.5">
          <span className="text-sm font-medium">{labels.title ?? "Notifications"}</span>
          {unread > 0 && onMarkAllRead ? (
            <Button variant="link" size="xs" onClick={onMarkAllRead} className="h-auto text-xs">
              {labels.markAllRead ?? "Mark all as read"}
            </Button>
          ) : null}
        </div>
        {notifications.length === 0 ? (
          <div className="px-4 py-10 text-center text-xs text-muted-foreground">
            {empty ?? "You're all caught up."}
          </div>
        ) : (
          <ul data-slot="notification-list" className="m-0 max-h-96 list-none overflow-y-auto p-1">
            {notifications.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  data-unread={item.read ? undefined : ""}
                  onClick={() => onItemClick?.(item)}
                  className="group/notification flex w-full gap-3 rounded-xl px-3 py-2.5 text-start outline-none hover:bg-muted focus-visible:bg-muted"
                >
                  {item.icon ? (
                    <span aria-hidden className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground [&_svg]:size-3.5">
                      {item.icon}
                    </span>
                  ) : null}
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="text-xs font-medium text-foreground group-not-data-unread/notification:font-normal group-not-data-unread/notification:text-muted-foreground">
                      {item.title}
                    </span>
                    {item.description ? (
                      <span className="line-clamp-2 text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    ) : null}
                    {item.date !== undefined ? (
                      <RelativeTime date={item.date} className="text-[11px] text-muted-foreground" />
                    ) : null}
                  </span>
                  {item.read ? null : (
                    <span className="mt-1.5 size-2 shrink-0 rounded-full bg-indigo-solid">
                      <span className="sr-only">Unread</span>
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </PopoverContent>
    </Popover>
  )
}

export { NotificationCenter }
export type { NotificationItem }

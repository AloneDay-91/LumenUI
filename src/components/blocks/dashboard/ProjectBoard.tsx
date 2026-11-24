"use client"

import * as React from "react"
import { CalendarIcon, MessageSquareIcon, PlusIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { Badge, type BadgeColor } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Kanban, type KanbanColumn, type KanbanValue } from "@/components/ui/Kanban"

type Task = {
  id: string
  title: string
  tag: { label: string; color: BadgeColor }
  owner: string
  due: string
  comments?: number
}

const columns: KanbanColumn[] = [
  { id: "backlog", title: "Backlog" },
  { id: "progress", title: "In progress" },
  { id: "review", title: "In review" },
  { id: "done", title: "Done" },
]

const design = { label: "Design", color: "indigo" } as const
const web = { label: "Web", color: "cyan" } as const
const billing = { label: "Billing", color: "orange" } as const
const bug = { label: "Bug", color: "crimson" } as const
const docs = { label: "Docs", color: "jade" } as const

const initialTasks: KanbanValue<Task> = {
  backlog: [
    { id: "t1", title: "Annual plan toggle on pricing", tag: billing, owner: "Alex Martin", due: "Dec 4" },
    { id: "t2", title: "Empty state for the orders table", tag: design, owner: "Sam Lee", due: "Dec 6" },
    { id: "t3", title: "Write the migration guide", tag: docs, owner: "Noa Petit", due: "Dec 9" },
  ],
  progress: [
    { id: "t4", title: "Invoice PDF export", tag: billing, owner: "Alex Martin", due: "Nov 28", comments: 4 },
    { id: "t5", title: "Sidebar folds to icons on tablet", tag: web, owner: "Jules Moreau", due: "Nov 29" },
  ],
  review: [
    { id: "t6", title: "Chart colours in dark mode", tag: design, owner: "Sam Lee", due: "Nov 26", comments: 2 },
    { id: "t7", title: "Webhook retries double-charge", tag: bug, owner: "Noa Petit", due: "Nov 25", comments: 7 },
  ],
  done: [
    { id: "t8", title: "Customer search by email", tag: web, owner: "Jules Moreau", due: "Nov 20" },
  ],
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")

export function ProjectBoard() {
  const [tasks, setTasks] = React.useState(initialTasks)

  return (
    <Kanban
      aria-label="Website relaunch"
      columns={columns}
      value={tasks}
      onValueChange={setTasks}
      getKey={(task) => task.id}
      getLabel={(task) => task.title}
      renderCard={(task) => (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col items-start gap-1.5">
            <Badge color={task.tag.color}>{task.tag.label}</Badge>
            <p className="m-0 text-xs font-medium leading-snug">{task.title}</p>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <CalendarIcon className="size-3" aria-hidden />
              {task.due}
            </span>
            {task.comments ? (
              <span className="flex items-center gap-1">
                <MessageSquareIcon className="size-3" aria-hidden />
                {task.comments}
              </span>
            ) : null}
            <Avatar className="ms-auto size-5" title={task.owner}>
              <AvatarFallback className="text-[9px]">{initials(task.owner)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      )}
      renderColumnFooter={(column) => (
        <Button
          variant="ghost"
          size="sm"
          className="justify-start text-muted-foreground"
          aria-label={`Add a task to ${column.title}`}
        >
          <PlusIcon data-icon="inline-start" />
          Add task
        </Button>
      )}
    />
  )
}

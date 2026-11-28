<script setup lang="ts">
import { ref } from "vue"
import { Calendar, MessageSquare, Plus } from "@lucide/vue"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge, type BadgeColor } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Kanban, type KanbanColumn, type KanbanValue } from "@/components/ui/kanban"

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

const tasks = ref<KanbanValue<Task>>({
  backlog: [
    { id: "t1", title: "Annual plan toggle on pricing", tag: { label: "Billing", color: "orange" }, owner: "Alex Martin", due: "Dec 4" },
    { id: "t2", title: "Empty state for the orders table", tag: { label: "Design", color: "indigo" }, owner: "Sam Lee", due: "Dec 6" },
    { id: "t3", title: "Write the migration guide", tag: { label: "Docs", color: "jade" }, owner: "Noa Petit", due: "Dec 9" },
  ],
  progress: [
    { id: "t4", title: "Invoice PDF export", tag: { label: "Billing", color: "orange" }, owner: "Alex Martin", due: "Nov 28", comments: 4 },
    { id: "t5", title: "Sidebar folds to icons on tablet", tag: { label: "Web", color: "cyan" }, owner: "Jules Moreau", due: "Nov 29" },
  ],
  review: [
    { id: "t6", title: "Chart colours in dark mode", tag: { label: "Design", color: "indigo" }, owner: "Sam Lee", due: "Nov 26", comments: 2 },
    { id: "t7", title: "Webhook retries double-charge", tag: { label: "Bug", color: "crimson" }, owner: "Noa Petit", due: "Nov 25", comments: 7 },
  ],
  done: [
    { id: "t8", title: "Customer search by email", tag: { label: "Web", color: "cyan" }, owner: "Jules Moreau", due: "Nov 20" },
  ],
})

const initials = (name: string) => name.split(" ").map((part) => part[0]).join("")
</script>

<template>
  <Kanban
    v-model="tasks"
    aria-label="Website relaunch"
    :columns="columns"
    :get-key="(task) => task.id"
    :get-label="(task) => task.title"
  >
    <template #card="{ item: task }">
      <div class="flex flex-col gap-3">
        <div class="flex flex-col items-start gap-1.5">
          <Badge :color="task.tag.color">{{ task.tag.label }}</Badge>
          <p class="m-0 text-xs leading-snug font-medium">{{ task.title }}</p>
        </div>
        <div class="flex items-center gap-3 text-[11px] text-muted-foreground">
          <span class="flex items-center gap-1">
            <Calendar class="size-3" aria-hidden="true" />
            {{ task.due }}
          </span>
          <span v-if="task.comments" class="flex items-center gap-1">
            <MessageSquare class="size-3" aria-hidden="true" />
            {{ task.comments }}
          </span>
          <Avatar class="ms-auto size-5" :title="task.owner">
            <AvatarFallback class="text-[9px]">{{ initials(task.owner) }}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </template>
    <template #column-footer="{ column }">
      <Button
        variant="ghost"
        size="sm"
        class="justify-start text-muted-foreground"
        :aria-label="`Add a task to ${column.title}`"
      >
        <Plus data-icon="inline-start" />
        Add task
      </Button>
    </template>
  </Kanban>
</template>

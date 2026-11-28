<script setup lang="ts">
import { ref } from "vue"
import { Badge } from "@/components/ui/badge"
import { SortableList } from "@/components/ui/sortable-list"

type Task = { id: string; title: string; tag: string }

const tasks = ref<Task[]>([
  { id: "tokens", title: "Ship the token sheet", tag: "Design" },
  { id: "docs", title: "Rewrite the install guide", tag: "Docs" },
  { id: "cli", title: "Publish the CLI", tag: "Release" },
  { id: "a11y", title: "Audit focus rings", tag: "A11y" },
])
</script>

<template>
  <SortableList
    v-model:items="tasks"
    aria-label="Priorities"
    class="w-full max-w-sm"
    :get-key="(task) => task.id"
    :get-label="(task) => task.title"
  >
    <template #default="{ item }">
      <div class="flex items-center justify-between gap-2">
        <span class="truncate">{{ item.title }}</span>
        <Badge variant="secondary">{{ item.tag }}</Badge>
      </div>
    </template>
  </SortableList>
</template>

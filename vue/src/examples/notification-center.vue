<script setup lang="ts">
import { markRaw, ref } from "vue"
import { GitPullRequest, MessageSquare, Rocket } from "@lucide/vue"

import { NotificationCenter, type NotificationItem } from "@/components/ui/notification-center"

const minutes = (n: number) => Date.now() - n * 60_000

const items = ref<NotificationItem[]>([
  {
    id: "1",
    icon: markRaw(GitPullRequest),
    title: "Review requested on #214",
    description: "Ada asked you to review “Split Button keeps its radius”.",
    date: minutes(3),
  },
  {
    id: "2",
    icon: markRaw(MessageSquare),
    title: "New comment on Banner",
    description: "“The floating pill reads well in dark mode.”",
    date: minutes(48),
  },
  {
    id: "3",
    icon: markRaw(Rocket),
    title: "v1.1.0 published",
    description: "The CLI is live on npm.",
    date: minutes(60 * 26),
    read: true,
  },
])

function markRead(item: NotificationItem) {
  items.value = items.value.map((n) => (n.id === item.id ? { ...n, read: true } : n))
}

function markAllRead() {
  items.value = items.value.map((n) => ({ ...n, read: true }))
}
</script>

<template>
  <NotificationCenter :notifications="items" @item-click="markRead" @mark-all-read="markAllRead" />
</template>

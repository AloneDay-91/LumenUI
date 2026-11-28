<script setup lang="ts">
import { computed, getCurrentInstance, type HTMLAttributes } from "vue"
import { Bell } from "@lucide/vue"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RelativeTime } from "@/components/ui/relative-time"
import { cn } from "@/lib/utils"
import type { NotificationCenterLabels, NotificationItem } from "./types"

/**
 * A bell with an unread count that opens the list. Reading state is yours:
 * mark items read on `item-click` and `mark-all-read`.
 */
const props = withDefaults(
  defineProps<{
    notifications: NotificationItem[]
    labels?: NotificationCenterLabels
    /** Text shown when the list is empty. The `#empty` slot takes rich content. */
    empty?: string
    class?: HTMLAttributes["class"]
  }>(),
  { labels: () => ({}) },
)
const emit = defineEmits<{
  itemClick: [item: NotificationItem]
  markAllRead: []
}>()

// React shows "Mark all as read" only when onMarkAllRead is passed: mirror that with the listener.
const instance = getCurrentInstance()
const hasMarkAllRead = computed(() => Boolean(instance?.vnode.props?.onMarkAllRead))

const unread = computed(() => props.notifications.filter((item) => !item.read).length)
const triggerLabel = computed(
  () =>
    props.labels.trigger?.(unread.value) ??
    (unread.value > 0 ? `Notifications, ${unread.value} unread` : "Notifications"),
)

const badgeClass =
  "absolute end-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-crimson-solid px-1 font-mono text-[10px] leading-none font-medium text-crimson-on-solid tabular-nums ring-2 ring-background"
const iconClass =
  "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground [&_svg]:size-3.5"
const titleClass =
  "text-xs font-medium text-foreground group-not-data-unread/notification:font-normal group-not-data-unread/notification:text-muted-foreground"
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="ghost"
        size="icon"
        :aria-label="triggerLabel"
        data-slot="notification-center-trigger"
        :class="cn('relative', props.class)"
      >
        <Bell aria-hidden="true" />
        <span v-if="unread > 0" aria-hidden="true" :class="badgeClass">
          {{ unread > 9 ? "9+" : unread }}
        </span>
      </Button>
    </PopoverTrigger>
    <PopoverContent align="end" class="w-80 p-0">
      <div class="flex items-center justify-between gap-2 border-b border-border px-4 py-2.5">
        <span class="text-sm font-medium">{{ labels.title ?? "Notifications" }}</span>
        <Button
          v-if="unread > 0 && hasMarkAllRead"
          variant="link"
          size="xs"
          class="h-auto text-xs"
          @click="emit('markAllRead')"
        >
          {{ labels.markAllRead ?? "Mark all as read" }}
        </Button>
      </div>
      <div v-if="notifications.length === 0" class="px-4 py-10 text-center text-xs text-muted-foreground">
        <slot name="empty">{{ empty ?? "You're all caught up." }}</slot>
      </div>
      <ul
        v-else
        data-slot="notification-list"
        class="m-0 max-h-96 list-none scroll-fade overflow-y-auto p-1"
      >
        <li v-for="item in notifications" :key="item.id">
          <button
            type="button"
            :data-unread="item.read ? undefined : ''"
            class="group/notification flex w-full gap-3 rounded-xl px-3 py-2.5 text-start outline-none hover:bg-muted focus-visible:bg-muted"
            @click="emit('itemClick', item)"
          >
            <span v-if="item.icon" aria-hidden="true" :class="iconClass">
              <component :is="item.icon" />
            </span>
            <span class="flex min-w-0 flex-1 flex-col gap-0.5">
              <span :class="titleClass">{{ item.title }}</span>
              <span v-if="item.description" class="line-clamp-2 text-xs text-muted-foreground">
                {{ item.description }}
              </span>
              <RelativeTime
                v-if="item.date !== undefined"
                :date="item.date"
                class="text-[11px] text-muted-foreground"
              />
            </span>
            <span v-if="!item.read" class="mt-1.5 size-2 shrink-0 rounded-full bg-indigo-solid">
              <span class="sr-only">Unread</span>
            </span>
          </button>
        </li>
      </ul>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { MessageScroller } from "@/components/ui/message-scroller"
import { cn } from "@/lib/utils"

/** The messages. A polite log region inside a Message Scroller. */
const props = defineProps<{
  class?: HTMLAttributes["class"]
  /** Classes for the log column inside the scroller. */
  contentClass?: HTMLAttributes["class"]
  /** Accessible name of the scroll-to-latest button. */
  label?: string
}>()
</script>

<template>
  <MessageScroller :class="cn('flex-1', props.class)" :label="label">
    <div
      role="log"
      aria-live="polite"
      data-slot="chat-messages"
      :class="cn('flex flex-col gap-6 p-1 pb-4', contentClass)"
    >
      <slot />
    </div>
  </MessageScroller>
</template>

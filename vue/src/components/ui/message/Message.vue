<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import type { MessageRole } from "."

/**
 * One turn. The person's text sits in a secondary bubble at the end edge; the
 * agent's reply reads as plain prose at full width, with its steps above it.
 */
const props = defineProps<{ class?: HTMLAttributes["class"]; from: MessageRole }>()
</script>

<template>
  <div
    data-slot="message"
    :data-from="from"
    :class="cn('group/message flex w-full gap-3', from === 'user' ? 'flex-row-reverse' : 'flex-row', props.class)"
  >
    <slot />
  </div>
</template>

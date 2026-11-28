<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

/**
 * The thread: a column with the messages in a Message Scroller and the
 * composer pinned under them. Give it a height; the messages scroll inside.
 */
const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="chat" :class="cn('flex min-h-0 flex-col gap-3', props.class)">
    <slot />
  </div>
</template>

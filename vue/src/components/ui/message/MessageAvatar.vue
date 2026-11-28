<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

/** Holds an Avatar. Optional: most chats only show the agent's. */
const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="message-avatar" :class="cn('shrink-0 *:data-[slot=avatar]:size-7', props.class)">
    <slot />
  </div>
</template>

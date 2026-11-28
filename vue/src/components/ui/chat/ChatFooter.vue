<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

/** Under the messages: suggestions, then the Prompt Input. */
const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="chat-footer" :class="cn('flex flex-col gap-2', props.class)">
    <slot />
  </div>
</template>

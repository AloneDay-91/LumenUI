<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

/** Copy, regenerate, rate. Shown on hover or focus so the thread stays calm. */
const actionsClassName =
  "flex items-center gap-0.5 text-muted-foreground opacity-0 transition-opacity group-hover/message:opacity-100 focus-within:opacity-100 [@media(hover:none)]:opacity-100"
const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="message-actions" :class="cn(actionsClassName, props.class)">
    <slot />
  </div>
</template>

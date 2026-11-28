<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

/** Shown before the first message. */
const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div
    data-slot="chat-empty"
    :class="
      cn(
        'flex flex-1 flex-col items-center justify-center gap-1 text-center text-sm text-muted-foreground',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>

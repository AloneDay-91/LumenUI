<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div
    data-slot="command-footer"
    :class="
      cn(
        'flex shrink-0 items-center gap-3 border-t border-foreground/5 bg-muted/50 px-3 py-2 text-xs text-muted-foreground dark:border-foreground/10',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>

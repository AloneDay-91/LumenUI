<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<{ class?: HTMLAttributes["class"]; align?: "start" | "end" }>(), {
  align: "start",
})
</script>

<template>
  <div
    data-slot="input-group-addon"
    :data-align="align"
    :class="
      cn(
        'flex h-full shrink-0 items-center gap-1 text-xs text-muted-foreground [&_svg]:size-3.5',
        align === 'start' ? 'ps-3 pe-1' : 'ps-1 pe-3',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>

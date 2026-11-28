<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { File } from "@lucide/vue"

import { cn } from "@/lib/utils"

/** A file the task read or wrote, as a small chip inside an item. */
const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <span
    data-slot="task-file"
    :class="
      cn(
        'inline-flex h-5 w-fit items-center gap-1 rounded-md bg-muted px-1.5 font-mono text-[11px] text-foreground',
        props.class,
      )
    "
  >
    <File aria-hidden="true" class="size-3 text-muted-foreground" />
    <slot />
  </span>
</template>

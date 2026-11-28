<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <main
    data-slot="sidebar-inset"
    :class="
      cn(
        'relative flex min-h-0 min-w-0 flex-1 flex-col bg-background',
        'md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:rounded-[min(var(--radius-4xl),24px)] md:peer-data-[variant=inset]:border md:peer-data-[variant=inset]:border-border md:peer-data-[variant=inset]:bg-background',
        'md:peer-data-[variant=inset]:peer-data-[side=left]:ml-0 md:peer-data-[variant=inset]:peer-data-[side=right]:mr-0',
        'md:peer-data-[variant=inset]:peer-data-[state=collapsed]:peer-data-[side=left]:ml-2 md:peer-data-[variant=inset]:peer-data-[state=collapsed]:peer-data-[side=right]:mr-2',
        props.class,
      )
    "
  >
    <slot />
  </main>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { useSidebar } from "./context"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
const { toggleSidebar } = useSidebar()
</script>

<template>
  <button
    type="button"
    data-slot="sidebar-rail"
    aria-label="Toggle sidebar"
    title="Toggle sidebar"
    :class="
      cn(
        'absolute inset-y-0 z-20 hidden w-2 cursor-ew-resize transition-colors after:absolute after:inset-y-3 after:w-px hover:after:bg-foreground/20 md:block',
        'group-data-[side=left]/sidebar:right-0 group-data-[side=left]/sidebar:after:right-0 group-data-[side=right]/sidebar:left-0 group-data-[side=right]/sidebar:after:left-0',
        props.class,
      )
    "
    @click="toggleSidebar"
  />
</template>

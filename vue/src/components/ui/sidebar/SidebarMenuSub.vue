<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <ul data-slot="sidebar-menu-sub" :class="cn('ms-[calc(1.25rem-0.5px)] flex min-w-0 flex-col gap-0.5 border-l border-border ps-2 py-0.5 group-data-[collapsible=icon]/sidebar:hidden', props.class)">
    <slot />
  </ul>
</template>

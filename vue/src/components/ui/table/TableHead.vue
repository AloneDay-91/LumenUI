<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <th data-slot="table-head" :class="cn('h-9 border-b border-border px-5 text-left align-middle text-xs font-medium text-muted-foreground', props.class)">
    <slot />
  </th>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <dd
    data-slot="data-list-value"
    :class="
      cn(
        'm-0 flex min-w-0 flex-wrap items-center gap-2 text-sm text-foreground',
        'group-data-[size=sm]/data-list:text-xs',
        props.class,
      )
    "
  >
    <slot />
  </dd>
</template>

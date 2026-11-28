<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div
    data-slot="callout-icon"
    :class="
      cn(
        'flex h-5 shrink-0 items-center text-current group-data-[size=sm]/callout:h-4 group-data-[size=lg]/callout:h-6 [&_svg]:size-4 group-data-[size=sm]/callout:[&_svg]:size-3.5 group-data-[size=lg]/callout:[&_svg]:size-5',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>

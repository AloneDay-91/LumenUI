<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="item-actions" :class="cn('flex shrink-0 items-center gap-2 [&_svg]:pointer-events-none [&_svg]:size-4', props.class)">
    <slot />
  </div>
</template>

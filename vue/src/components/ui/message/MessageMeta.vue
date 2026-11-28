<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="message-meta" :class="cn('text-xs text-muted-foreground tabular-nums', props.class)">
    <slot />
  </div>
</template>

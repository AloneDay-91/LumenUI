<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <p
    data-slot="stepper-title"
    :class="cn('text-sm font-medium', 'group-data-[status=upcoming]/step:text-muted-foreground', props.class)"
  >
    <slot />
  </p>
</template>

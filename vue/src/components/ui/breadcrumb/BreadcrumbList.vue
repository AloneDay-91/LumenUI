<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <ol
    data-slot="breadcrumb-list"
    :class="cn('flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground', props.class)"
  >
    <slot />
  </ol>
</template>

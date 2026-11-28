<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <caption data-slot="table-caption" :class="cn('border-b border-border px-5 py-3 text-left text-xs text-muted-foreground', props.class)">
    <slot />
  </caption>
</template>

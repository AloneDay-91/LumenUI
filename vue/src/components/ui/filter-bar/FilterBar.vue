<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="filter-bar" role="group" :class="cn('flex flex-wrap items-center gap-2', props.class)">
    <slot />
  </div>
</template>

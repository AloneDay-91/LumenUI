<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="stat" :class="cn('flex min-w-0 flex-col gap-1', props.class)">
    <slot />
  </div>
</template>

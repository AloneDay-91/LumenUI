<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

/** A sequence of steps on a rail, each with its own status. */
const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <ol data-slot="trace-steps" :class="cn('m-0 flex list-none flex-col p-0', props.class)">
    <slot />
  </ol>
</template>

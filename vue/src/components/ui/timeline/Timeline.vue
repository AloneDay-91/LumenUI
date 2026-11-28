<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <ol data-slot="timeline" :class="cn('flex flex-col', props.class)">
    <slot />
  </ol>
</template>

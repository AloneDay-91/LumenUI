<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="alert-description" :class="cn('text-xs md:text-pretty [&_p:not(:last-child)]:mb-4', props.class)">
    <slot />
  </div>
</template>

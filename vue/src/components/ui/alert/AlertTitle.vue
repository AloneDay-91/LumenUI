<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="alert-title" :class="cn('font-medium group-has-[>svg]/alert:col-start-2', props.class)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <li data-slot="breadcrumb-item" :class="cn('inline-flex min-w-0 items-center gap-1.5', props.class)">
    <slot />
  </li>
</template>

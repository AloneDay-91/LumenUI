<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"]; title?: string }>()
</script>

<template>
  <div data-slot="navigation-menu-group" :class="cn('flex flex-col items-start gap-6', props.class)">
    <p v-if="title" class="text-sm text-muted-foreground">{{ title }}</p>
    <slot />
  </div>
</template>

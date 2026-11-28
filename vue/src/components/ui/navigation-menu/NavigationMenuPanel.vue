<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div
    data-slot="navigation-menu-panel"
    :class="cn('mx-auto grid min-h-72 w-full grid-cols-2 gap-10 px-6 pt-12 pb-16 md:px-12', props.class)"
  >
    <slot />
  </div>
</template>

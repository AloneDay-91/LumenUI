<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

/** Supporting copy. Hidden below sm so the bar keeps one line on phones. */
const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <span data-slot="banner-description" :class="cn('hidden text-muted-foreground sm:inline', props.class)">
    {{ " — " }}<slot />
  </span>
</template>

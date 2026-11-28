<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Not a link, but announced as the current step rather than as plain text. -->
  <span
    data-slot="breadcrumb-page"
    role="link"
    aria-disabled="true"
    aria-current="page"
    :class="cn('truncate font-medium text-foreground', props.class)"
  >
    <slot />
  </span>
</template>

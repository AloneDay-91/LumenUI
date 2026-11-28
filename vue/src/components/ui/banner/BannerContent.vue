<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

/** Title and description on one line; truncates rather than wraps. */
const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Sized here, not inherited: a <p> inside prose would otherwise pick up the body size. -->
  <p data-slot="banner-content" :class="cn('m-0 min-w-0 truncate text-xs leading-5', props.class)">
    <slot />
  </p>
</template>

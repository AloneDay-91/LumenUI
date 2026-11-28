<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { indicatorClass, useBanner } from "./context"

/** Hued dot, or an icon passed in the default slot. */
const props = defineProps<{ class?: HTMLAttributes["class"] }>()
const { variant } = useBanner()
</script>

<template>
  <span
    v-if="$slots.default"
    data-slot="banner-indicator"
    aria-hidden="true"
    :class="cn('flex text-muted-foreground', props.class)"
  >
    <slot />
  </span>
  <span
    v-else
    data-slot="banner-indicator"
    aria-hidden="true"
    :class="cn('size-1.5 shrink-0 rounded-full', indicatorClass[variant], props.class)"
  />
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <p
    data-slot="callout-text"
    :class="
      cn(
        'm-0 min-w-0 leading-[inherit] text-[length:inherit] text-inherit only:col-span-2 [&_a]:text-inherit [&_a]:underline [&_a]:underline-offset-4',
        props.class,
      )
    "
  >
    <slot />
  </p>
</template>

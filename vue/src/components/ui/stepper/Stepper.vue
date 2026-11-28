<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = withDefaults(
  defineProps<{ orientation?: "horizontal" | "vertical"; class?: HTMLAttributes["class"] }>(),
  { orientation: "horizontal" }
)
</script>

<template>
  <ol
    data-slot="stepper"
    :data-orientation="orientation"
    :class="cn('group/stepper flex w-full', orientation === 'horizontal' ? 'flex-row' : 'flex-col', props.class)"
  >
    <slot />
  </ol>
</template>

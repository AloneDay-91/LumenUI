<script setup lang="ts">
import type { HTMLAttributes, StyleValue } from "vue"

import { cn } from "@/lib/utils"

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{ ratio?: number; class?: HTMLAttributes["class"]; style?: StyleValue }>(),
  { ratio: 16 / 9 }
)
</script>

<template>
  <div
    data-slot="aspect-ratio"
    v-bind="$attrs"
    :class="cn('relative w-full min-w-0 overflow-hidden', '[&_img]:size-full [&_img]:object-cover', '[&_video]:size-full [&_video]:object-cover', props.class)"
    :style="[{ aspectRatio: String(props.ratio) }, props.style]"
  >
    <slot />
  </div>
</template>

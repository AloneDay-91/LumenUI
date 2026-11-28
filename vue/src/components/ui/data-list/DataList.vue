<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import type { DataListOrientation, DataListSize } from "."

const props = withDefaults(
  defineProps<{
    orientation?: DataListOrientation
    size?: DataListSize
    class?: HTMLAttributes["class"]
  }>(),
  { orientation: "horizontal", size: "default" }
)
</script>

<template>
  <dl
    data-slot="data-list"
    :data-orientation="orientation"
    :data-size="size"
    :class="
      cn(
        'group/data-list m-0 text-sm wrap-break-word',
        orientation === 'horizontal' &&
          'grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 gap-y-4 data-[size=sm]:gap-y-3 data-[size=lg]:gap-y-5',
        orientation === 'vertical' && 'flex flex-col gap-4 data-[size=sm]:gap-3 data-[size=lg]:gap-5',
        props.class,
      )
    "
  >
    <slot />
  </dl>
</template>

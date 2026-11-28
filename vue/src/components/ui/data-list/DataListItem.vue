<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { itemAlignClass, type DataListAlign } from "."

const props = withDefaults(
  defineProps<{
    align?: DataListAlign
    class?: HTMLAttributes["class"]
  }>(),
  { align: "baseline" }
)
</script>

<template>
  <div
    data-slot="data-list-item"
    :data-align="align"
    :class="
      cn(
        'min-w-0',
        'group-data-[orientation=horizontal]/data-list:col-span-2 group-data-[orientation=horizontal]/data-list:grid group-data-[orientation=horizontal]/data-list:grid-cols-subgrid group-data-[orientation=horizontal]/data-list:gap-x-6',
        'group-data-[orientation=vertical]/data-list:flex group-data-[orientation=vertical]/data-list:flex-col group-data-[orientation=vertical]/data-list:gap-1',
        itemAlignClass[align],
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>

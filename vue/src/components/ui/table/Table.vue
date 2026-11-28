<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

defineOptions({ inheritAttrs: false })

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <!-- Attributes land on the <table>, not on the scrolling wrapper. -->
  <div
    data-slot="table-wrap"
    class="relative w-full min-w-0 overflow-x-auto rounded-2xl border border-border"
  >
    <table
      data-slot="table"
      v-bind="$attrs"
      :class="cn('w-full caption-top border-separate border-spacing-0 text-xs', props.class)"
    >
      <slot />
    </table>
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <tfoot data-slot="table-footer" :class="cn('bg-muted/40 font-medium [&_td]:border-t [&_td]:border-b-0 [&_tr]:hover:bg-transparent', props.class)">
    <slot />
  </tfoot>
</template>

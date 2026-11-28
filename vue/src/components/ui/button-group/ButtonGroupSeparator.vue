<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div
    data-slot="button-group-separator"
    role="separator"
    :class="
      cn(
        'relative z-10 self-stretch bg-border group-data-[orientation=vertical]/button-group:h-px group-data-[orientation=vertical]/button-group:w-auto w-px',
        props.class,
      )
    "
  />
</template>

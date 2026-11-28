<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div
    data-slot="avatar-group"
    role="group"
    :class="
      cn(
        'flex items-center -space-x-2 rtl:space-x-reverse',
        '*:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>

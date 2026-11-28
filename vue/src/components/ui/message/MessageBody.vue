<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

/** Column for steps, content, actions, and meta. */
const bodyClassName =
  "flex min-w-0 flex-col gap-2 group-data-[from=user]/message:max-w-[80%] group-data-[from=user]/message:items-end group-data-[from=assistant]/message:flex-1 group-data-[from=assistant]/message:gap-3"
const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="message-body" :class="cn(bodyClassName, props.class)">
    <slot />
  </div>
</template>

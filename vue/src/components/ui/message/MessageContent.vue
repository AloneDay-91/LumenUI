<script setup lang="ts">
import type { HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"

const contentClassName =
  "text-sm leading-6 text-pretty break-words [&_p]:m-0 [&_p+p]:mt-3 group-data-[from=user]/message:rounded-3xl group-data-[from=user]/message:bg-secondary group-data-[from=user]/message:px-4 group-data-[from=user]/message:py-2 group-data-[from=user]/message:text-secondary-foreground group-data-[from=assistant]/message:text-foreground"
const props = defineProps<{ class?: HTMLAttributes["class"] }>()
</script>

<template>
  <div data-slot="message-content" :class="cn(contentClassName, props.class)">
    <slot />
  </div>
</template>

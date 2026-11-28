<script setup lang="ts">
import type { ButtonHTMLAttributes, HTMLAttributes } from "vue"
import { MoreHorizontal } from "@lucide/vue"

import { cn } from "@/lib/utils"

const props = withDefaults(
  defineProps<{ class?: HTMLAttributes["class"]; type?: ButtonHTMLAttributes["type"] }>(),
  { type: "button" }
)
</script>

<template>
  <!-- A native <button>: the collapsed steps have to stay reachable, and a menu
       trigger (as-child) needs a real button to keep its semantics. -->
  <button
    data-slot="breadcrumb-ellipsis"
    :type="type"
    :class="
      cn(
        'flex size-5 items-center justify-center rounded-md transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none [&>svg]:size-3.5',
        props.class,
      )
    "
  >
    <slot><MoreHorizontal /></slot>
    <span class="sr-only">More</span>
  </button>
</template>

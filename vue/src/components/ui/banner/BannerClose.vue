<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { X } from "@lucide/vue"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { useBanner } from "./context"

const props = defineProps<{ class?: HTMLAttributes["class"] }>()
// Your @click runs first; call event.preventDefault() in it to keep the banner open.
const emit = defineEmits<{ click: [event: MouseEvent] }>()
const { dismiss } = useBanner()

function onClick(event: MouseEvent) {
  emit("click", event)
  if (!event.defaultPrevented) dismiss()
}

const barClassName =
  "group-data-[appearance=bar]/banner:absolute group-data-[appearance=bar]/banner:end-2 group-data-[appearance=bar]/banner:top-1/2 group-data-[appearance=bar]/banner:-translate-y-1/2"
</script>

<template>
  <button
    type="button"
    data-slot="banner-close"
    aria-label="Dismiss"
    :class="
      cn(
        buttonVariants({ variant: 'ghost', size: 'icon-xs' }),
        'shrink-0 text-muted-foreground hover:text-foreground',
        barClassName,
        props.class,
      )
    "
    @click="onClick"
  >
    <slot><X /></slot>
  </button>
</template>

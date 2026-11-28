<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { Primitive, type PrimitiveProps } from "reka-ui"

import { cn } from "@/lib/utils"

/** Text link after the message. Use `as-child` around a RouterLink for client routing. */
const props = withDefaults(defineProps<PrimitiveProps & { class?: HTMLAttributes["class"] }>(), {
  as: "a",
})

const actionClassName =
  "shrink-0 rounded-sm font-medium text-foreground underline-offset-4 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/30"
const floatingClassName =
  "group-data-[appearance=floating]/banner:inline-flex group-data-[appearance=floating]/banner:h-6 group-data-[appearance=floating]/banner:items-center group-data-[appearance=floating]/banner:rounded-full group-data-[appearance=floating]/banner:bg-secondary group-data-[appearance=floating]/banner:px-2.5 group-data-[appearance=floating]/banner:hover:no-underline group-data-[appearance=floating]/banner:hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]"
</script>

<template>
  <Primitive
    data-slot="banner-action"
    :as="as"
    :as-child="asChild"
    :class="cn(actionClassName, floatingClassName, props.class)"
  >
    <slot />
  </Primitive>
</template>

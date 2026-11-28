<script setup lang="ts">
import { inject, type HTMLAttributes } from "vue"
import { Primitive, type PrimitiveProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { commandContextKey } from "./context"

/** Rendered only when no item matches the search. */
const props = withDefaults(defineProps<PrimitiveProps & { class?: HTMLAttributes["class"] }>(), { as: "div" })

const context = inject(commandContextKey)!
</script>

<template>
  <Primitive
    v-if="context.visibleCount.value === 0"
    data-slot="command-empty"
    role="presentation"
    :as="as"
    :as-child="asChild"
    :class="cn('py-6 text-center text-xs text-muted-foreground', props.class)"
  >
    <slot />
  </Primitive>
</template>

<script setup lang="ts">
import { inject, onBeforeUnmount, useId, watchEffect, type HTMLAttributes } from "vue"
import { Primitive, type PrimitiveProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { fieldsetContextKey } from "./context"

const props = withDefaults(
  defineProps<PrimitiveProps & { id?: string; class?: HTMLAttributes["class"] }>(),
  { as: "div" }
)

const context = inject(fieldsetContextKey, null)
const generatedId = useId()

watchEffect(() => {
  if (context) context.legendId.value = props.id ?? generatedId
})
onBeforeUnmount(() => {
  if (context) context.legendId.value = undefined
})
</script>

<template>
  <Primitive
    data-slot="fieldset-legend"
    :as="as"
    :as-child="asChild"
    :id="props.id ?? generatedId"
    :data-disabled="context?.disabled.value ? '' : undefined"
    :class="cn('text-xs font-medium', props.class)"
  >
    <slot />
  </Primitive>
</template>

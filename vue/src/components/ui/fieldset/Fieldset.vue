<script setup lang="ts">
import { computed, provide, ref, type HTMLAttributes } from "vue"
import { Primitive, type PrimitiveProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { fieldsetContextKey } from "./context"

const props = withDefaults(
  defineProps<PrimitiveProps & { disabled?: boolean; class?: HTMLAttributes["class"] }>(),
  { as: "fieldset", disabled: false }
)

// The legend registers its id here, so the fieldset is labelled by it.
const legendId = ref<string>()
provide(fieldsetContextKey, { legendId, disabled: computed(() => props.disabled) })
</script>

<template>
  <Primitive
    data-slot="fieldset"
    :as="as"
    :as-child="asChild"
    :disabled="disabled || undefined"
    :data-disabled="disabled ? '' : undefined"
    :aria-labelledby="legendId"
    :class="cn('flex flex-col gap-3', props.class)"
  >
    <slot />
  </Primitive>
</template>

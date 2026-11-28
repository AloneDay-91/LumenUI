<script setup lang="ts">
import { computed, provide, useId, type HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { fieldKey } from "./context"

const props = defineProps<{
  class?: HTMLAttributes["class"]
  /** Marks the control aria-invalid and shows FieldError. */
  invalid?: boolean
  disabled?: boolean
  name?: string
}>()

const id = useId()
provide(fieldKey, {
  controlId: `${id}-control`,
  descriptionId: `${id}-description`,
  errorId: `${id}-error`,
  invalid: computed(() => props.invalid),
  disabled: computed(() => props.disabled),
  name: computed(() => props.name),
})
</script>

<template>
  <div
    data-slot="field"
    :data-invalid="invalid ? '' : undefined"
    :data-disabled="disabled ? '' : undefined"
    :class="cn('flex flex-col gap-1.5', props.class)"
  >
    <slot />
  </div>
</template>

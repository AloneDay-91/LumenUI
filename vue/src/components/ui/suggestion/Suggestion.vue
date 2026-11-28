<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import type { PrimitiveProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { Button, type ButtonVariantProps } from "@/components/ui/button"

/** A short prompt you can send to the agent in one click. */
const props = withDefaults(
  defineProps<
    PrimitiveProps & {
      suggestion: string
      variant?: ButtonVariantProps["variant"]
      size?: ButtonVariantProps["size"]
      disabled?: boolean
      loading?: boolean
      class?: HTMLAttributes["class"]
    }
  >(),
  { variant: "outline", size: "sm" },
)

const emit = defineEmits<{ select: [suggestion: string] }>()

const delegated = computed(() => {
  const { class: _class, suggestion: _suggestion, ...rest } = props
  return rest
})
</script>

<template>
  <Button
    data-slot="suggestion"
    v-bind="delegated"
    :class="cn('shrink-0 font-normal', props.class)"
    @click="emit('select', suggestion)"
  >
    <slot>{{ suggestion }}</slot>
  </Button>
</template>

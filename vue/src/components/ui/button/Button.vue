<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { Primitive, type PrimitiveProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
import { buttonVariants, type ButtonVariantProps } from "."

interface Props extends PrimitiveProps {
  variant?: ButtonVariantProps["variant"]
  size?: ButtonVariantProps["size"]
  class?: HTMLAttributes["class"]
  disabled?: boolean
  /** Shows a Spinner, sets aria-busy, and blocks clicks while keeping focus. */
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  variant: "default",
  size: "default",
})

const iconOnly = computed(() => typeof props.size === "string" && props.size.startsWith("icon"))

// A loading button stays focusable (no disabled attribute) but swallows clicks.
function blockWhileLoading(event: MouseEvent) {
  if (props.loading) {
    event.preventDefault()
    event.stopImmediatePropagation()
  }
}
</script>

<template>
  <Primitive
    data-slot="button"
    :as="as"
    :as-child="asChild"
    :disabled="disabled || undefined"
    :data-loading="loading ? '' : undefined"
    :aria-busy="loading || undefined"
    :aria-disabled="loading || undefined"
    :class="
      cn(
        buttonVariants({ variant, size }),
        // The Spinner takes the place of a leading icon instead of sitting beside it.
        'data-loading:cursor-progress data-loading:[&>[data-icon=inline-start]:not([data-slot=spinner])]:hidden',
        props.class,
      )
    "
    @click="blockWhileLoading"
  >
    <!-- The Spinner is decoration here: aria-busy on the button carries the state. -->
    <Spinner v-if="loading && iconOnly" :role="undefined" :aria-label="undefined" aria-hidden="true" />
    <template v-else>
      <Spinner
        v-if="loading"
        :role="undefined"
        :aria-label="undefined"
        aria-hidden="true"
        data-icon="inline-start"
      />
      <slot />
    </template>
  </Primitive>
</template>

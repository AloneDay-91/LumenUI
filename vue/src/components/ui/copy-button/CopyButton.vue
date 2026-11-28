<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useSlots, type HTMLAttributes } from "vue"
import { Check, Copy } from "@lucide/vue"
import type { PrimitiveProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { Button, type ButtonVariantProps } from "@/components/ui/button"

defineOptions({ inheritAttrs: false })

/**
 * Copies `value` to the clipboard and swaps to a check for `timeout` ms.
 * Without slot content it is an icon button; with slot content the label swaps too.
 */
const props = withDefaults(
  defineProps<
    PrimitiveProps & {
      /** Text to copy, or a function that returns it at click time. */
      value: string | (() => string)
      timeout?: number
      /** Accessible name before the copy, and the visible label when the slot is set. */
      label?: string
      copiedLabel?: string
      variant?: ButtonVariantProps["variant"]
      size?: ButtonVariantProps["size"]
      disabled?: boolean
      loading?: boolean
      class?: HTMLAttributes["class"]
    }
  >(),
  { as: "button", timeout: 2000, label: "Copy", copiedLabel: "Copied", variant: "ghost" }
)

const emit = defineEmits<{
  /** Runs before the copy; call event.preventDefault() to cancel it. */
  click: [event: MouseEvent]
  copy: [value: string]
}>()

const slots = useSlots()
const iconOnly = computed(() => !slots.default)

const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined
onBeforeUnmount(() => clearTimeout(timer))

async function copy(event: MouseEvent) {
  emit("click", event)
  if (event.defaultPrevented) return
  const text = typeof props.value === "function" ? props.value() : props.value
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    return
  }
  copied.value = true
  emit("copy", text)
  clearTimeout(timer)
  timer = setTimeout(() => (copied.value = false), props.timeout)
}
</script>

<template>
  <Button
    data-slot="copy-button"
    :data-copied="copied ? '' : undefined"
    :as="as"
    :as-child="asChild"
    :variant="variant"
    :size="size ?? (iconOnly ? 'icon-sm' : 'default')"
    :disabled="disabled"
    :loading="loading"
    :aria-label="iconOnly ? (copied ? copiedLabel : label) : undefined"
    v-bind="$attrs"
    :class="cn(iconOnly && 'text-muted-foreground hover:text-foreground', props.class)"
    @click="copy"
  >
    <component
      :is="copied ? Check : Copy"
      aria-hidden="true"
      :data-icon="iconOnly ? undefined : 'inline-start'"
      :class="cn(copied && 'text-jade-ink')"
    />
    <template v-if="!iconOnly">
      <template v-if="copied">{{ copiedLabel }}</template>
      <slot v-else />
    </template>
  </Button>
  <!-- Outside the button, so it announces without joining the button's name. -->
  <span role="status" class="sr-only">{{ copied ? copiedLabel : "" }}</span>
</template>

<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { Bookmark, RotateCcw } from "@lucide/vue"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/**
 * A point in the conversation you can return to: a rule across the thread
 * with a label and a Restore button.
 */
const props = withDefaults(
  defineProps<{
    /** Plain-text label. Use the `label` slot for richer content. */
    label?: string
    restoreLabel?: string
    /** Listening to `@restore` shows the Restore button. */
    onRestore?: () => void
    class?: HTMLAttributes["class"]
  }>(),
  { restoreLabel: "Restore" },
)

defineSlots<{ label?: () => unknown }>()

const ariaLabel = computed(() => (props.label ? `Checkpoint: ${props.label}` : "Checkpoint"))
</script>

<template>
  <div
    data-slot="checkpoint"
    role="separator"
    :aria-label="ariaLabel"
    :class="cn('flex items-center gap-3 text-xs text-muted-foreground', props.class)"
  >
    <span aria-hidden="true" class="h-px flex-1 bg-border" />
    <span class="flex items-center gap-1.5">
      <Bookmark aria-hidden="true" class="size-3.5" />
      <slot name="label">{{ label }}</slot>
    </span>
    <Button v-if="onRestore" variant="ghost" size="xs" class="text-muted-foreground" @click="onRestore()">
      <RotateCcw data-icon="inline-start" />
      {{ restoreLabel }}
    </Button>
    <span aria-hidden="true" class="h-px flex-1 bg-border" />
  </div>
</template>

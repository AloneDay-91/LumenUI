<script setup lang="ts">
import { computed, ref, watch, type HTMLAttributes } from "vue"
import { X } from "@lucide/vue"
import { ToolbarButton, ToolbarRoot, ToolbarSeparator } from "reka-ui"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * A bar of bulk actions that rises when something is selected and leaves
 * when nothing is: the count, a clear button, and your actions. It is a
 * toolbar, so the arrows move between its buttons. Escape clears.
 */
const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"]
    /** How many items are selected. The bar shows from 1. */
    count: number
    /** `fixed` floats over the page; `absolute` sits in the nearest positioned parent. */
    position?: "fixed" | "absolute"
    labels?: {
      toolbar?: string
      count?: (count: number) => string
      clear?: string
    }
  }>(),
  { position: "fixed", labels: () => ({}) }
)

/** Fired by the clear button and by Escape. */
const emit = defineEmits<{ clear: [] }>()

const slots = defineSlots<{
  /** The actions: Buttons, or SelectionBarAction. */
  default?: () => unknown
  /** Replaces the "N selected" text. */
  count?: (props: { count: number }) => unknown
}>()

const open = computed(() => props.count > 0)
// Keep the last count while the bar slides away, so it does not read "0".
const shown = ref(props.count)
watch(
  () => props.count,
  (count) => {
    if (count > 0) shown.value = count
  }
)

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    event.preventDefault()
    emit("clear")
  }
}
</script>

<template>
  <div
    data-slot="selection-bar"
    :data-open="open ? '' : undefined"
    :class="
      cn(
        position,
        'inset-x-0 bottom-4 z-40 flex justify-center px-4 transition-[opacity,translate] duration-200',
        open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
      )
    "
    :inert="!open || undefined"
  >
    <ToolbarRoot
      :aria-label="labels.toolbar ?? 'Selection actions'"
      :class="
        cn(
          'flex max-w-full items-center gap-1 overflow-x-auto rounded-4xl bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/5 dark:ring-foreground/10',
          props.class,
        )
      "
      @keydown="onKeydown"
    >
      <span aria-live="polite" class="shrink-0 ps-2.5 pe-1 text-xs font-medium tabular-nums whitespace-nowrap">
        <slot name="count" :count="shown">{{ labels.count?.(shown) ?? `${shown} selected` }}</slot>
      </span>
      <ToolbarButton as-child>
        <Button
          variant="ghost"
          size="icon-xs"
          :aria-label="labels.clear ?? 'Clear selection'"
          class="text-muted-foreground"
          @click="emit('clear')"
        >
          <X />
        </Button>
      </ToolbarButton>
      <ToolbarSeparator v-if="slots.default" class="mx-1 h-4 w-px shrink-0 bg-border" />
      <div class="flex items-center gap-1">
        <slot />
      </div>
    </ToolbarRoot>
  </div>
</template>

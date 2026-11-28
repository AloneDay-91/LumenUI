<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import type { CalendarDayModifiers } from "."

const props = withDefaults(
  defineProps<{
    modifiers?: CalendarDayModifiers
    class?: HTMLAttributes["class"]
  }>(),
  { modifiers: () => ({}) }
)

const inRange = computed(() => Boolean(props.modifiers.range_middle))
const selected = computed(() => Boolean(props.modifiers.selected) && !inRange.value)
</script>

<template>
  <button
    type="button"
    data-slot="calendar-day-button"
    :class="
      cn(
        buttonVariants({ variant: selected ? 'default' : 'ghost', size: 'icon-sm' }),
        'size-8 font-normal',
        // Reka marks a disabled day with data-disabled, not the disabled attribute.
        'data-disabled:pointer-events-none data-disabled:opacity-50',
        modifiers.disabled && 'pointer-events-none opacity-50',
        modifiers.today && !modifiers.selected && 'ring-1 ring-foreground/15',
        modifiers.outside && !modifiers.selected && 'text-muted-foreground',
        inRange && 'rounded-none bg-transparent text-foreground hover:bg-muted',
        props.class,
      )
    "
  >
    <slot />
  </button>
</template>

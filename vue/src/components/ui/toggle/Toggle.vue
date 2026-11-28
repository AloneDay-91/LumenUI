<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { Toggle, useForwardPropsEmits, type ToggleEmits, type ToggleProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<ToggleProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<ToggleEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)

const toggleClassName = [
  "inline-flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-4xl px-3 text-xs font-medium whitespace-nowrap text-muted-foreground outline-none select-none",
  "hover:bg-muted hover:text-foreground",
  "focus-visible:relative focus-visible:z-1 focus-visible:ring-3 focus-visible:ring-ring/30",
  "disabled:pointer-events-none disabled:opacity-50",
  "data-[state=on]:bg-muted data-[state=on]:text-foreground",
  "in-data-[slot=toggle-group]:h-7 in-data-[slot=toggle-group]:hover:bg-transparent",
  "in-data-[slot=toggle-group]:data-[state=on]:bg-background in-data-[slot=toggle-group]:data-[state=on]:shadow-sm in-data-[slot=toggle-group]:data-[state=on]:ring-1 in-data-[slot=toggle-group]:data-[state=on]:ring-foreground/5",
  "in-data-[slot=toggle-group]:data-[state=on]:hover:bg-background",
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
]
</script>

<template>
  <Toggle v-slot="slotProps" data-slot="toggle" v-bind="forwarded" :class="cn(toggleClassName, props.class)">
    <slot v-bind="slotProps" />
  </Toggle>
</template>

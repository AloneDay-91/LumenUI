<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { ChevronDown } from "@lucide/vue"
import { SelectIcon, SelectTrigger, type SelectTriggerProps } from "reka-ui"

import { cn } from "@/lib/utils"

const triggerClassName =
  "flex w-fit items-center justify-between gap-1.5 rounded-2xl border border-border bg-transparent px-3 py-2 text-xs whitespace-nowrap transition-[color,box-shadow] duration-200 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"

const props = withDefaults(
  defineProps<SelectTriggerProps & { class?: HTMLAttributes["class"]; size?: "sm" | "default" }>(),
  { size: "default" }
)

const delegated = computed(() => {
  const { class: _class, size: _size, ...rest } = props
  return rest
})
</script>

<template>
  <SelectTrigger
    data-slot="select-trigger"
    :data-size="size"
    v-bind="delegated"
    :class="cn(triggerClassName, props.class)"
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="pointer-events-none size-4 text-muted-foreground" />
    </SelectIcon>
  </SelectTrigger>
</template>

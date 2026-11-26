<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { Check } from "@lucide/vue"
import {
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  useForwardPropsEmits,
  type SelectItemEmits,
  type SelectItemProps,
} from "reka-ui"

import { cn } from "@/lib/utils"

const itemClassName =
  "relative flex min-h-7 w-full cursor-pointer items-center gap-2 rounded-xl py-1.5 pr-8 pl-2 text-xs outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"

const props = defineProps<SelectItemProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<SelectItemEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <SelectItem
    data-slot="select-item"
    v-bind="forwarded"
    :class="cn(itemClassName, props.class)"
  >
    <SelectItemText class="flex flex-1 shrink-0 gap-2 whitespace-nowrap">
      <slot />
    </SelectItemText>
    <span class="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
      <SelectItemIndicator>
        <Check class="pointer-events-none" />
      </SelectItemIndicator>
    </span>
  </SelectItem>
</template>

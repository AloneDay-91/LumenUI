<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { ToggleGroupItem, useForwardProps, type ToggleGroupItemProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { toggleGroupItemClassName } from "./styles"

const props = defineProps<ToggleGroupItemProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <!-- data-slot="toggle" so it matches the React Toggle inside a group. -->
  <ToggleGroupItem
    v-slot="slotProps"
    data-slot="toggle"
    v-bind="forwarded"
    :class="cn(toggleGroupItemClassName, props.class)"
  >
    <slot v-bind="slotProps" />
  </ToggleGroupItem>
</template>

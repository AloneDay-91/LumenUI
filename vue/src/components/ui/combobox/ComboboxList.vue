<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { ComboboxViewport, useForwardProps, type ComboboxViewportProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<ComboboxViewportProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <ComboboxViewport
    data-slot="combobox-list"
    v-bind="forwarded"
    :class="cn('min-h-0 flex-1 scroll-fade overflow-y-auto', props.class)"
  >
    <slot />
  </ComboboxViewport>
</template>

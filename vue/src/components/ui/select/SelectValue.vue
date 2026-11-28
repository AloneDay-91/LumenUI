<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { SelectValue, useForwardProps, type SelectValueProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<SelectValueProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <SelectValue
    data-slot="select-value"
    v-bind="forwarded"
    :class="cn('flex flex-1 text-left', props.class)"
  >
    <slot />
  </SelectValue>
</template>

<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { SelectGroup, useForwardProps, type SelectGroupProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<SelectGroupProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <SelectGroup
    data-slot="select-group"
    v-bind="forwarded"
    :class="cn('scroll-my-1.5 p-1', props.class)"
  >
    <slot />
  </SelectGroup>
</template>

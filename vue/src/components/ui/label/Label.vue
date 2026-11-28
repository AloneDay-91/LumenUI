<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { Label, useForwardProps, type LabelProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<LabelProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <Label
    data-slot="label"
    v-bind="forwarded"
    :class="cn('flex cursor-pointer items-center gap-2 text-xs leading-none font-medium select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 has-[:disabled]:cursor-not-allowed has-[[aria-disabled=true]]:cursor-not-allowed', props.class)"
  >
    <slot />
  </Label>
</template>

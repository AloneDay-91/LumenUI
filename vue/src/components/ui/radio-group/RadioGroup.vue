<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { RadioGroupRoot, useForwardPropsEmits, type RadioGroupRootProps, type RadioGroupRootEmits } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<RadioGroupRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<RadioGroupRootEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <RadioGroupRoot
    data-slot="radio-group"
    v-bind="forwarded"
    :class="cn('flex flex-col gap-2', props.class)"
  >
    <slot />
  </RadioGroupRoot>
</template>

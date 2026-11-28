<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { RadioGroupIndicator, RadioGroupItem, useForwardPropsEmits, type RadioGroupItemProps, type RadioGroupItemEmits } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<RadioGroupItemProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<RadioGroupItemEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <RadioGroupItem
    data-slot="radio-group-item"
    v-bind="forwarded"
    :class="cn('peer flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full border border-transparent bg-input/50 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary', props.class)"
  >
    <RadioGroupIndicator class="size-1.5 rounded-full bg-primary-foreground" />
  </RadioGroupItem>
</template>

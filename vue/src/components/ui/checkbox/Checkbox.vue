<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { Check, Minus } from "@lucide/vue"
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits, type CheckboxRootProps, type CheckboxRootEmits } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<CheckboxRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<CheckboxRootEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <CheckboxRoot
    data-slot="checkbox"
    v-bind="forwarded"
    :class="cn('group/checkbox peer flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-md border border-transparent bg-input/50 text-primary-foreground transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground aria-invalid:border-destructive', props.class)"
  >
    <CheckboxIndicator
      data-slot="checkbox-indicator"
      class="flex items-center justify-center text-current"
    >
      <Minus class="hidden size-3 group-data-[state=indeterminate]/checkbox:block" />
      <Check class="size-3 group-data-[state=indeterminate]/checkbox:hidden" />
    </CheckboxIndicator>
  </CheckboxRoot>
</template>

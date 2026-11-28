<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import {
  CheckboxGroupRoot,
  useForwardPropsEmits,
  type CheckboxGroupRootEmits,
  type CheckboxGroupRootProps,
} from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<CheckboxGroupRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<CheckboxGroupRootEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <CheckboxGroupRoot
    data-slot="checkbox-group"
    v-bind="forwarded"
    :class="cn('flex flex-col gap-2', props.class)"
  >
    <slot />
  </CheckboxGroupRoot>
</template>

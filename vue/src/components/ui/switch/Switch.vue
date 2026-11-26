<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { SwitchRoot, SwitchThumb, useForwardPropsEmits, type SwitchRootProps, type SwitchRootEmits } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<SwitchRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<SwitchRootEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <SwitchRoot
    data-slot="switch"
    v-bind="forwarded"
    :class="cn('inline-flex h-5 w-8 shrink-0 cursor-pointer items-center rounded-full bg-input/80 p-0.5 outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary', props.class)"
  >
    <SwitchThumb
      data-slot="switch-thumb"
      class="block size-4 rounded-full bg-background shadow-sm transition-transform data-[state=checked]:translate-x-3"
    />
  </SwitchRoot>
</template>

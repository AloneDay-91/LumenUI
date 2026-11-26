<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { TabsRoot, useForwardPropsEmits, type TabsRootProps, type TabsRootEmits } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<TabsRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<TabsRootEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <TabsRoot
    data-slot="tabs"
    v-bind="forwarded"
    :class="cn('flex flex-col gap-3 data-[orientation=vertical]:flex-row', props.class)"
  >
    <slot />
  </TabsRoot>
</template>

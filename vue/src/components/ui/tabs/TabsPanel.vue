<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { TabsContent, useForwardProps, type TabsContentProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<TabsContentProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <TabsContent
    data-slot="tabs-panel"
    v-bind="forwarded"
    :class="cn('text-xs outline-none', props.class)"
  >
    <slot />
  </TabsContent>
</template>

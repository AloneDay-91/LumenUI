<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { ListboxContent, useForwardProps, type ListboxContentProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<ListboxContentProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <ListboxContent
    data-slot="command-list"
    v-bind="forwarded"
    :class="cn('max-h-72 scroll-py-1 scroll-fade overflow-y-auto p-1', props.class)"
  >
    <slot />
  </ListboxContent>
</template>

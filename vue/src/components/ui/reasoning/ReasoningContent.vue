<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { useForwardPropsEmits, type CollapsibleContentEmits, type CollapsibleContentProps } from "reka-ui"

import { TraceContent } from "@/components/ui/trace"
import { cn } from "@/lib/utils"

const props = defineProps<CollapsibleContentProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<CollapsibleContentEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <TraceContent v-bind="forwarded" :class="cn('[&>div]:leading-5 [&>div]:whitespace-pre-wrap', props.class)">
    <slot />
  </TraceContent>
</template>

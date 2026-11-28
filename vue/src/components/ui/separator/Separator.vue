<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { Separator, type SeparatorProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = withDefaults(defineProps<SeparatorProps & { class?: HTMLAttributes["class"] }>(), {
  orientation: "horizontal",
})

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
</script>

<template>
  <Separator
    data-slot="separator"
    v-bind="delegated"
    :class="
      cn(
        'shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch',
        props.class,
      )
    "
  />
</template>

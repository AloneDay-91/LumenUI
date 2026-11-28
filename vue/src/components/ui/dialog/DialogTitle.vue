<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { DialogTitle, useForwardProps, type DialogTitleProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<DialogTitleProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <DialogTitle
    data-slot="dialog-title"
    v-bind="forwarded"
    :class="cn('text-sm font-medium', props.class)"
  >
    <slot />
  </DialogTitle>
</template>

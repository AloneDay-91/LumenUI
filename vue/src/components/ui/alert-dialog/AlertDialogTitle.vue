<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { AlertDialogTitle, useForwardProps, type AlertDialogTitleProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<AlertDialogTitleProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <AlertDialogTitle
    data-slot="alert-dialog-title"
    v-bind="forwarded"
    :class="cn('text-sm font-medium', props.class)"
  >
    <slot />
  </AlertDialogTitle>
</template>

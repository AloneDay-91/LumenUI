<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { AlertDialogDescription, useForwardProps, type AlertDialogDescriptionProps } from "reka-ui"

import { cn } from "@/lib/utils"

const props = defineProps<AlertDialogDescriptionProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardProps(delegated)
</script>

<template>
  <AlertDialogDescription
    data-slot="alert-dialog-description"
    v-bind="forwarded"
    :class="cn('text-xs text-muted-foreground', props.class)"
  >
    <slot />
  </AlertDialogDescription>
</template>

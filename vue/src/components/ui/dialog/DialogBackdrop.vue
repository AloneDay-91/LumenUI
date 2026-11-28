<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { DialogOverlay, type DialogOverlayProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { backdropClassName } from "@/components/ui/styles"

const props = defineProps<DialogOverlayProps & { class?: HTMLAttributes["class"] }>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
</script>

<template>
  <DialogOverlay data-slot="dialog-backdrop" v-bind="delegated" :class="cn(backdropClassName, props.class)" />
</template>

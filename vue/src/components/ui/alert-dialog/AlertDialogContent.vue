<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import {
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogPortal,
  useForwardPropsEmits,
  type AlertDialogContentEmits,
  type AlertDialogContentProps,
} from "reka-ui"

import { cn } from "@/lib/utils"
import { backdropClassName, popupClassName } from "@/components/ui/styles"

defineOptions({ inheritAttrs: false })

const props = defineProps<AlertDialogContentProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<AlertDialogContentEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <AlertDialogPortal>
    <AlertDialogOverlay data-slot="alert-dialog-backdrop" :class="backdropClassName" />
    <AlertDialogContent
      data-slot="alert-dialog-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          popupClassName,
          'fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 p-5 sm:max-w-md',
          props.class,
        )
      "
    >
      <slot />
    </AlertDialogContent>
  </AlertDialogPortal>
</template>

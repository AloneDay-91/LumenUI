<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { X } from "@lucide/vue"
import {
  DialogClose,
  DialogContent,
  DialogPortal,
  useForwardPropsEmits,
  type DialogContentEmits,
  type DialogContentProps,
} from "reka-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { popupClassName } from "@/components/ui/styles"
import DialogBackdrop from "./DialogBackdrop.vue"

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<DialogContentProps & { class?: HTMLAttributes["class"]; showClose?: boolean }>(),
  { showClose: true }
)
const emits = defineEmits<DialogContentEmits>()

const delegated = computed(() => {
  const { class: _class, showClose: _showClose, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <DialogPortal>
    <DialogBackdrop />
    <DialogContent
      data-slot="dialog-content"
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
      <DialogClose v-if="showClose" as-child>
        <Button variant="ghost" size="icon-sm" class="absolute top-3 right-3 text-muted-foreground">
          <X />
          <span class="sr-only">Close</span>
        </Button>
      </DialogClose>
    </DialogContent>
  </DialogPortal>
</template>

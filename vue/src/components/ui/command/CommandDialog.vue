<script setup lang="ts">
import { type HTMLAttributes } from "vue"
import { useForwardPropsEmits, type DialogRootEmits, type DialogRootProps } from "reka-ui"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import Command from "./Command.vue"

const props = withDefaults(
  defineProps<
    DialogRootProps & {
      title?: string
      description?: string
      class?: HTMLAttributes["class"]
    }
  >(),
  { title: "Command palette", description: "Search for a command to run.", open: undefined, defaultOpen: false, modal: true },
)
const emits = defineEmits<DialogRootEmits>()

const forwarded = useForwardPropsEmits(
  () => ({ open: props.open, defaultOpen: props.defaultOpen, modal: props.modal }),
  emits,
)

const groupHeadingClassName =
  "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground"
</script>

<template>
  <Dialog v-bind="forwarded">
    <DialogContent :show-close="false" :class="cn('overflow-hidden p-0 sm:max-w-lg', props.class)">
      <DialogTitle class="sr-only">{{ title }}</DialogTitle>
      <DialogDescription class="sr-only">{{ description }}</DialogDescription>
      <Command :class="groupHeadingClassName">
        <slot />
      </Command>
    </DialogContent>
  </Dialog>
</template>

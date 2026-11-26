<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import {
  SelectContent,
  SelectPortal,
  SelectViewport,
  useForwardPropsEmits,
  type SelectContentEmits,
  type SelectContentProps,
} from "reka-ui"

import { cn } from "@/lib/utils"

defineOptions({ inheritAttrs: false })

// "item-aligned" lines the selected item up with the trigger, like the React
// alignItemWithTrigger default. Pass position="popper" for a dropdown under it.
const props = withDefaults(defineProps<SelectContentProps & { class?: HTMLAttributes["class"] }>(), {
  position: "item-aligned",
  side: "bottom",
  sideOffset: 4,
  align: "center",
})
const emits = defineEmits<SelectContentEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <SelectPortal>
    <SelectContent
      data-slot="select-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="
        cn(
          'relative isolate z-50 flex min-w-36 flex-col overflow-hidden rounded-2xl bg-popover text-popover-foreground shadow-lg ring-1 ring-foreground/5 duration-100 dark:ring-foreground/10 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          position === 'popper' &&
            'max-h-(--reka-select-content-available-height) w-(--reka-select-trigger-width) origin-(--reka-select-content-transform-origin)',
          props.class,
        )
      "
    >
      <!-- The viewport scrolls, not the popup, so the fade masks the items and not the popup's surface. -->
      <SelectViewport class="min-h-0 flex-1 scroll-fade">
        <slot />
      </SelectViewport>
    </SelectContent>
  </SelectPortal>
</template>

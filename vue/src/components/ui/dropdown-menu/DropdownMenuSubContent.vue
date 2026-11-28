<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import {
  DropdownMenuPortal,
  DropdownMenuSubContent,
  useForwardPropsEmits,
  type DropdownMenuSubContentProps,
  type DropdownMenuSubContentEmits,
} from "reka-ui"

import { cn } from "@/lib/utils"
import { dropdownMenuContentClassName } from "./styles"

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<DropdownMenuSubContentProps & { class?: HTMLAttributes["class"] }>(), {
  sideOffset: 4,
})
const emits = defineEmits<DropdownMenuSubContentEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuSubContent
      data-slot="dropdown-menu-sub-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="cn(dropdownMenuContentClassName, props.class)"
    >
      <!-- The inner list scrolls, so the fade masks the items and not the popup's surface. -->
      <div data-slot="dropdown-menu-viewport" class="min-h-0 flex-1 scroll-fade overflow-y-auto p-1">
        <slot />
      </div>
    </DropdownMenuSubContent>
  </DropdownMenuPortal>
</template>

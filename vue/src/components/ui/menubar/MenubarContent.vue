<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import {
  MenubarContent,
  MenubarPortal,
  useForwardPropsEmits,
  type MenubarContentEmits,
  type MenubarContentProps,
} from "reka-ui"

import { dropdownMenuContentClassName } from "@/components/ui/dropdown-menu/styles"
import { cn } from "@/lib/utils"

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<MenubarContentProps & { class?: HTMLAttributes["class"] }>(), {
  align: "start",
  alignOffset: 0,
  side: "bottom",
  sideOffset: 4,
})
const emits = defineEmits<MenubarContentEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <MenubarPortal>
    <MenubarContent
      data-slot="dropdown-menu-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="cn(dropdownMenuContentClassName, props.class)"
    >
      <div data-slot="dropdown-menu-viewport" class="min-h-0 flex-1 scroll-fade overflow-y-auto p-1">
        <slot />
      </div>
    </MenubarContent>
  </MenubarPortal>
</template>

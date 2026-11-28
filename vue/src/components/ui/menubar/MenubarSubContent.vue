<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import {
  MenubarPortal,
  MenubarSubContent,
  useForwardPropsEmits,
  type MenubarSubContentEmits,
  type MenubarSubContentProps,
} from "reka-ui"

import { dropdownMenuContentClassName } from "@/components/ui/dropdown-menu/styles"
import { cn } from "@/lib/utils"

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<MenubarSubContentProps & { class?: HTMLAttributes["class"] }>(), {
  sideOffset: 4,
})
const emits = defineEmits<MenubarSubContentEmits>()

const delegated = computed(() => {
  const { class: _class, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <MenubarPortal>
    <MenubarSubContent
      data-slot="dropdown-menu-sub-content"
      v-bind="{ ...$attrs, ...forwarded }"
      :class="cn(dropdownMenuContentClassName, props.class)"
    >
      <div data-slot="dropdown-menu-viewport" class="min-h-0 flex-1 scroll-fade overflow-y-auto p-1">
        <slot />
      </div>
    </MenubarSubContent>
  </MenubarPortal>
</template>
